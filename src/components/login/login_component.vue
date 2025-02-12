<template>
  <div>
    <div class="title">登入</div>
    <div class="inputs_container">
      <div class="login_input_container">
        <Common_input
          placeholder="請輸入帳號"
          v-model="formState.username.value"
          :errorMessage="formState.username.errorMessage"
          :hasError="formState.username.hasError"
        />
      </div>

      <div class="login_input_container">
        <Common_input
          placeholder="請輸入密碼"
          type="password"
          v-model="formState.password.value"
          :errorMessage="formState.password.errorMessage"
          :hasError="formState.password.hasError"
        />
      </div>

      <div class="checkbox_container">
        <input id="remember" type="checkbox" v-model="formState.remember" />
        <label for="remember">保持登入</label>
      </div>

      <div class="btn_container">
        <Common_btn
          :text="isLoading ? '登入中...' : '登入'"
          :styleType="isLoading ? 'disable' : 'primary'"
          @click="login"
        />
      </div>

      <div class="go_to_register">
        新朋友嗎，<span @click="switchToRegister">點我註冊</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import login_Logic from "../../controllers/login_controller";
import Common_input from "../widgets/Common_input.vue";
import Common_btn from "../widgets/Common_btn.vue";

// 切換到註冊頁面
const emit = defineEmits(["toRegister"]);
function switchToRegister() {
  emit("toRegister");
}

// 從 RegisterLogic 中獲取所有狀態與方法
const { formState, isLoading, login } = login_Logic();
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
  .login_input_container {
    margin-bottom: 15px;
  }
  .checkbox_container {
    margin-bottom: 15px;
  }
  .go_to_register {
    margin-top: 10px;
    span {
      color: $red;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
