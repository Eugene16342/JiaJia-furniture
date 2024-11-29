<template>
  <div>
    <div class="title">登入</div>
    <div class="inputs_container">
      <div class="login_input_container">
        <Common_input placeholder="請輸入帳號" />
      </div>

      <div class="login_input_container">
        <Common_input placeholder="請輸入密碼" />
        <div class="checkbox_container">
          <input id="remember" type="checkbox" /><label for="remember"
            >保持登入</label
          >
        </div>
      </div>

      <Common_btn text="登入" />

      <div class="go_to_register">
        新朋友嗎，<span @click="switchToRegister">點我註冊</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import Common_input from "../widgets/Common_input.vue";
import Common_btn from "../widgets/Common_btn.vue";

const emit = defineEmits(["toRegister"]);

function switchToRegister() {
  emit("toRegister"); // 通知父組件切換到註冊
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
  .login_input_container {
    margin-bottom: 30px;
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
