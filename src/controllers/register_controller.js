import { reactive, ref } from "vue";
import { use_navbar_store } from "../stores/index";
import axios from "axios";
import notification_method from "./notify_controller";

export default function RegisterLogic() {
  const formState = reactive({
    user_name: { value: "", errorMessage: "", hasError: false },
    password: { value: "", errorMessage: "", hasError: false },
    confirmPassword: { value: "", errorMessage: "", hasError: false },
    email: { value: "", errorMessage: "", hasError: false },
    verify_code: { value: "", errorMessage: "", hasError: false },
    is_agreement_checked: false,
    agreementError: "",
  });

  const captcha_url = ref("");
  let captcha_id = null;

  async function refresh_captcha() {
    try {
      const response = await axios.get("/api/auth/generate_captcha");
      captcha_id = response.data.captcha_id;
      captcha_url.value = `data:image/svg+xml;base64,${btoa(
        response.data.captchaData
      )}`;
    } catch (error) {
      console.error("無法刷新驗證碼:", error);
    }
  }

  async function validate_form() {
    let isValid = true;

    // 驗證帳號

    const user_name_regex = /^[a-zA-Z0-9]+$/;
    if (formState.user_name.value.length < 8) {
      formState.user_name.errorMessage = "帳號長度不能小於8位";
      formState.user_name.hasError = true;
      isValid = false;
    } else if (!user_name_regex.test(formState.user_name.value)) {
      formState.user_name.errorMessage = "帳號只能包含英文字母和數字";
      formState.user_name.hasError = true;
      isValid = false;
    } else {
      formState.user_name.errorMessage = "";
      formState.user_name.hasError = false;
    }

    // 驗證密碼
    const password_regex = /^[a-zA-Z0-9]+$/;
    if (formState.password.value.length < 6) {
      formState.password.errorMessage = "密碼長度不能小於6位";
      formState.password.hasError = true;
      isValid = false;
    } else if (!password_regex.test(formState.password.value)) {
      formState.password.errorMessage = "密碼只能包含英文字母和數字";
      formState.password.hasError = true;
      isValid = false;
    } else {
      formState.password.errorMessage = "";
      formState.password.hasError = false;
    }

    // 驗證確認密碼
    if (
      formState.confirmPassword.value === "" ||
      formState.confirmPassword.value !== formState.password.value
    ) {
      formState.confirmPassword.errorMessage = "兩次密碼輸入不一致";
      formState.confirmPassword.hasError = true;
      isValid = false;
    } else {
      formState.confirmPassword.errorMessage = "";
      formState.confirmPassword.hasError = false;
    }

    // 驗證信箱

    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email_regex.test(formState.email.value)) {
      formState.email.errorMessage = "請輸入正確的電子郵件地址";
      formState.email.hasError = true;
      isValid = false;
    } else {
      formState.email.errorMessage = "";
      formState.email.hasError = false;
    }

    try {
      const response = await axios.get("/api/auth/check_isRepeat", {
        params: {
          user_name: formState.user_name.value.trim().toLowerCase(),
          email: formState.email.value.toLowerCase(),
        },
      });

      const details = response.data.details;

      if (details.user_name) {
        formState.user_name.errorMessage = details.user_name;
        formState.user_name.hasError = true;
        isValid = false;
      }

      if (details.email) {
        formState.email.errorMessage = details.email;
        formState.email.hasError = true;
        isValid = false;
      }
    } catch (error) {
      console.error("驗證帳號、信箱是否重複失敗", error);
    }

    // 驗證驗證碼
    if (formState.verify_code.value.length !== 4) {
      formState.verify_code.errorMessage = "驗證碼格式錯誤";
      formState.verify_code.hasError = true;
      refresh_captcha();
      isValid = false;
    } else {
      try {
        const response = await axios.post("/api/auth/check_captcha", {
          captcha: formState.verify_code.value.trim(),
          captcha_id,
        });
        // 驗證成功
        formState.verify_code.errorMessage = "";
        formState.verify_code.hasError = false;
      } catch (error) {
        // 驗證失敗
        formState.verify_code.errorMessage = "驗證碼錯誤";
        formState.verify_code.hasError = true;
        refresh_captcha();
        isValid = false;
      }
    }

    // 驗證是否勾選服務條款
    if (!formState.is_agreement_checked) {
      formState.agreementError = "請勾選同意服務條款";
      isValid = false;
    } else {
      formState.agreementError = "";
    }

    return isValid;
  }

  async function submit_form(emit) {
    if (await validate_form()) {
      try {
        const payload = {
          user_name: formState.user_name.value.trim(),
          email: formState.email.value.trim(),
          password: formState.password.value,
          captcha: formState.verify_code.value,
          captcha_id,
        };
        await axios.post("/api/auth/register", payload);

        notification_method.success("註冊成功!");

        emit("toLogin");
      } catch (error) {
        formState.verify_code.value = "";
        refresh_captcha();

        notification_method.error("註冊失敗，請稍後再試");
        console.error("註冊失敗:", error);
      }
    } else {
      console.error("註冊表單有誤");
    }
  }

  return {
    formState,
    captcha_url,
    refresh_captcha,
    submit_form,
  };
}
