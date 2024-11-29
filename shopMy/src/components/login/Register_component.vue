<template>
  <div>
    <div class="title">註冊</div>
    <div class="inputs_container">
      <div class="register_input_container">
        <Common_input
          placeholder="請輸入帳號"
          v-model="formState.username.value"
          :errorMessage="formState.username.errorMessage"
          :hasError="formState.username.hasError"
        />
      </div>

      <div class="register_input_container">
        <Common_input
          placeholder="請輸入密碼"
          v-model="formState.password.value"
          :errorMessage="formState.password.errorMessage"
          :hasError="formState.password.hasError"
        />
      </div>

      <div class="register_input_container">
        <Common_input
          placeholder="再次輸入密碼"
          v-model="formState.confirmPassword.value"
          :errorMessage="formState.confirmPassword.errorMessage"
          :hasError="formState.confirmPassword.hasError"
        />
      </div>

      <div class="register_input_container">
        <Common_input
          placeholder="請輸入信箱"
          v-model="formState.email.value"
          :errorMessage="formState.email.errorMessage"
          :hasError="formState.email.hasError"
        />
      </div>

      <div class="code">
        <div class="register_input_container">
          <Common_input
            placeholder="請輸入驗證碼"
            v-model="formState.verificationCode.value"
            :errorMessage="formState.verificationCode.errorMessage"
            :hasError="formState.verificationCode.hasError"
          />
        </div>
        <div class="code_container">asdasd</div>
      </div>

      <div class="checkbox_container">
        <input id="agreement" type="checkbox" />
        <label for="agreement"> 我同意</label
        ><span @click.stop="openPolicy">服務條款</span>
      </div>

      <div class="btn_containers">
        <div class="btn_container">
          <Common_btn text="註冊" @click="submitForm" />
        </div>
        <div class="btn_container">
          <Common_btn text="取消" styleType="second" @click="switchToLogin" />
        </div>
      </div>
    </div>
    <div v-if="isPolicyOpen">
      <Privacy_policy @close="closePolicy" />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import Common_input from "../widgets/Common_input.vue";
import Common_btn from "../widgets/Common_btn.vue";
import Privacy_policy from "../common/Privacy_policy.vue";

const isPolicyOpen = ref(false);

const emit = defineEmits(["toLogin"]);

function switchToLogin() {
  emit("toLogin"); // 通知父組件切換到登入
}

function openPolicy() {
  isPolicyOpen.value = true; // 打開服務條款視窗
}

function closePolicy() {
  isPolicyOpen.value = false; // 關閉服務條款視窗
}

const formState = reactive({
  username: { value: "", errorMessage: "", hasError: false },
  password: { value: "", errorMessage: "", hasError: false },
  confirmPassword: { value: "", errorMessage: "", hasError: false },
  email: { value: "", errorMessage: "", hasError: false },
  verificationCode: { value: "", errorMessage: "", hasError: false },
});

function validateForm() {
  let isValid = true;

  // 驗證帳號
  if (!formState.username.value) {
    formState.username.errorMessage = "帳號不能為空";
    formState.username.hasError = true;
    isValid = false;
  } else {
    formState.username.errorMessage = "";
    formState.username.hasError = false;
  }

  // 驗證密碼
  if (formState.password.value.length < 6) {
    formState.password.errorMessage = "密碼長度不能小於6位";
    formState.password.hasError = true;
    isValid = false;
  } else {
    formState.password.errorMessage = "";
    formState.password.hasError = false;
  }

  // 確認密碼
  if (formState.confirmPassword.value !== formState.password.value) {
    formState.confirmPassword.errorMessage = "兩次密碼輸入不一致";
    formState.confirmPassword.hasError = true;
    isValid = false;
  } else {
    formState.confirmPassword.errorMessage = "";
    formState.confirmPassword.hasError = false;
  }

  // 驗證電子郵件
  if (!/\S+@\S+\.\S+/.test(formState.email.value)) {
    formState.email.errorMessage = "請輸入正確的電子郵件地址";
    formState.email.hasError = true;
    isValid = false;
  } else {
    formState.email.errorMessage = "";
    formState.email.hasError = false;
  }

  return isValid;
}

function submitForm() {
  if (validateForm()) {
    console.log("表單提交成功", formState);
    // 在此處提交表單數據到後端
  } else {
    console.log("表單有錯誤，請修正");
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/colors.scss";

.title {
  font-weight: 600;
  font-size: 1.5rem;
  padding: 10px 0 0 20px;
}
.inputs_container {
  width: 80%;
  margin: auto;
  margin-top: 50px;
  .register_input_container {
    margin-bottom: 10px;
  }

  .code {
    display: flex;

    .register_input_container {
      width: 60%;
    }
    .code_container {
      width: 40%;
      background-color: $gray;
      height: 40px;
      display: flex;
      align-items: center;
      padding: 20px;
      border-radius: 5px;
    }
  }
  .checkbox_container {
    margin-bottom: 20px;
    span {
      color: $red;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }
  .btn_containers {
    display: flex;
    gap: 10%;
    margin-bottom: 40px;
    .btn_container {
      width: 100%;
    }
  }
}
</style>
