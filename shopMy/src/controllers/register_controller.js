import { reactive, ref } from "vue";
import axios from "axios";

export default function RegisterLogic() {
  const formState = reactive({
    username: { value: "", errorMessage: "", hasError: false },
    password: { value: "", errorMessage: "", hasError: false },
    confirmPassword: { value: "", errorMessage: "", hasError: false },
    email: { value: "", errorMessage: "", hasError: false },
    verify_code: { value: "", errorMessage: "", hasError: false },
    is_agreement_checked: false,
    agreementError: "",
  });

  const captcha_url = ref("");

  function refresh_captcha() {
    captcha_url.value = `/api/auth/generate_captcha?${Date.now()}`;
  }

  async function validate_form() {
    let isValid = true;

    // 驗證帳號
    const username_regex = /^[a-zA-Z0-9]+$/;
    if (formState.username.value.length < 8) {
      formState.username.errorMessage = "帳號長度不能小於8位";
      formState.username.hasError = true;
      isValid = false;
    } else if (!username_regex.test(formState.username.value)) {
      formState.username.errorMessage = "帳號只能包含英文字母和數字";
      formState.username.hasError = true;
      isValid = false;
    } else {
      formState.username.errorMessage = "";
      formState.username.hasError = false;
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

    // 驗證驗證碼
    if (formState.verify_code.value.length !== 4) {
      formState.verify_code.errorMessage = "驗證碼格式錯誤";
      formState.verify_code.hasError = true;
      refresh_captcha(); // 更新驗證碼
      isValid = false;
    } else {
      try {
        const response = await axios.post("/api/auth/check_captcha", {
          captcha: formState.verify_code.value.trim(),
        });
        // 驗證成功
        formState.verify_code.errorMessage = "";
        formState.verify_code.hasError = false;
      } catch (error) {
        // 驗證失敗
        formState.verify_code.errorMessage = "驗證碼錯誤";
        formState.verify_code.hasError = true;
        refresh_captcha(); // 更新驗證碼
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

  async function submit_form() {
    if (await validate_form()) {
      try {
        const payload = {
          user_name: formState.username.value.trim(),
          email: formState.email.value.trim(),
          password: formState.password.value,
          captcha: formState.verify_code.value,
        };
        const response = await axios.post("/api/auth/register", payload);
        console.log("Payload: ", payload);
        alert("註冊成功！");
        switchToLogin();
      } catch (error) {
        console.error("註冊失敗:", error);
      }
    } else {
      console.log("註冊表單有誤");
    }
  }

  return {
    formState,
    captcha_url,
    refresh_captcha,

    submit_form,
  };
}
