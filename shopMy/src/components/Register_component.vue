<template>
  <div>
    <div class="title">註冊</div>
    <div class="inputs_container">
      <div class="register_input_container">
        <Common_input placeholder="請輸入帳號" />
      </div>

      <div class="register_input_container">
        <Common_input placeholder="請輸入密碼" />
      </div>

      <div class="register_input_container">
        <Common_input placeholder="再次輸入密碼" />
      </div>

      <div class="register_input_container">
        <Common_input placeholder="請輸入信箱" />
      </div>

      <div class="code">
        <div class="register_input_container">
          <Common_input placeholder="請輸入驗證碼" />
        </div>
        <div class="code_container">asdasd</div>
      </div>

      <div class="checkbox_container">
        <input id="agreement" type="checkbox" />
        <label for="agreement"> 我同意</label
        ><span @click.stop="openPolicy">服務條款</span>
      </div>

      <div class="btn_containers">
        <div class="btn_container"><Common_btn text="註冊" /></div>
        <div class="btn_container">
          <Common_btn text="取消" @click="switchToLogin" />
        </div>
      </div>
    </div>
    <div v-show="isPolicOpen">
      <Privacy_policy @close="closePolicy" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Common_input from "../widgets/Common_input.vue";
import Common_btn from "../widgets/Common_btn.vue";
import Privacy_policy from "../widgets/Privacy_policy.vue";

const isPolicOpen = ref(false);

const emit = defineEmits(["toLogin"]);

function switchToLogin() {
  emit("toLogin"); // 通知父組件切換到登入
}

function openPolicy() {
  isPolicOpen.value = true; // 打開服務條款視窗
}

function closePolicy() {
  isPolicOpen.value = false; // 關閉服務條款視窗
}
</script>

<style lang="scss" scoped>
@import "../assets/colors.scss";

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
