<template>
  <div class="black_cover">
    <div class="login_component_container">
      <div class="close" @click="closeContainer">
        <The_icon icon="x" />
      </div>
      <div class="component_container" v-if="!isRegister">
        <login_component @toRegister="switchToRegister" />
      </div>
      <div v-else><Register_component @toLogin="switchToLogin" /></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import login_component from "./login_component.vue";
import Register_component from "./Register_component.vue";
import The_icon from "./The_icon.vue";
// 是否顯示註冊
const isRegister = ref(false);

// 切換到註冊
function switchToRegister() {
  isRegister.value = true;
}

function switchToLogin() {
  isRegister.value = false;
}

// 發送 close 事件給父組件
const emit = defineEmits(["close"]);

function closeContainer() {
  emit("close");
}
</script>

<style lang="scss" scoped>
@import "../assets/colors.scss";

.login_component_container {
  position: relative;
  width: 60%;
  max-width: 600px;
  min-height: 400px;
  background-color: $white;
  margin: auto;
  border-radius: 5px;
  .close {
    position: absolute;
    right: 2%;
    top: 3%;
    font-size: 1.5rem;
  }
  .component_container {
    width: 100%;
  }
}

@media (max-width: 992px) {
  .login_component_container {
    width: 80%;
  }
}
</style>
