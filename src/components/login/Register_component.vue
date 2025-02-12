<template>
  <div>
    <div class="title">註冊</div>
    <div class="inputs_container">
      <div class="register_input_container">
        <Common_input
          placeholder="請輸入帳號"
          v-model="formState.user_name.value"
          :errorMessage="formState.user_name.errorMessage"
          :hasError="formState.user_name.hasError"
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
            v-model="formState.verify_code.value"
            :errorMessage="formState.verify_code.errorMessage"
            :hasError="formState.verify_code.hasError"
          />
        </div>
        <div class="code_container">
          <img :src="captcha_url" />
          <The_icon icon="retry" @click="refresh_captcha" class="retry" />
        </div>
      </div>

      <div class="checkbox_container">
        <input
          id="agreement"
          type="checkbox"
          v-model="formState.is_agreement_checked"
        />
        <label for="agreement"> 我同意</label>
        <span @click.stop="open_policy">服務條款</span>
        <div
          class="error_message"
          :class="{ visible: !!formState.agreementError }"
        >
          {{ formState.agreementError }}
        </div>
      </div>

      <div class="btn_containers">
        <div class="btn_container">
          <Common_btn text="註冊" @click="handle_submit" />
        </div>
        <div class="btn_container">
          <Common_btn text="取消" styleType="second" @click="switchToLogin" />
        </div>
      </div>
    </div>
    <div v-if="isPolicy_open">
      <Privacy_policy @close="close_policy" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Common_input from "../widgets/Common_input.vue";
import Common_btn from "../widgets/Common_btn.vue";
import Privacy_policy from "../common/Privacy_policy.vue";
import The_icon from "../common/The_icon.vue";

const emit = defineEmits(["toLogin"]);

function switchToLogin() {
  emit("toLogin"); // 通知父組件切換到登入
}

// 導入邏輯
import register_controller from "../../controllers/register_controller";

const isPolicy_open = ref(false);

function open_policy() {
  isPolicy_open.value = true;
}

function close_policy() {
  isPolicy_open.value = false;
}

const { formState, captcha_url, refresh_captcha, submit_form } =
  register_controller();

async function handle_submit() {
  await submit_form(emit);
}

onMounted(() => {
  refresh_captcha();
});
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
      height: 40px;
      display: flex;
      align-items: center;
      border-radius: 5px;
      margin-left: 20px;
      gap: 10px;
      img {
        height: 40px;
        border-radius: 5px;
      }
      .retry {
        user-select: none;
      }
    }
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
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

    .error_message {
      width: 100%;
      height: 20px;
      color: $red;
      font-size: 0.9rem;
      opacity: 0;

      transition: opacity 0.2s ease-in-out;

      &.visible {
        opacity: 1;
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
