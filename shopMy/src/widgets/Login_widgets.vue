<template>
  <transition name="fade">
    <div v-if="isOpen" class="modal_overlay" @click.self="closeModal">
      <div class="modal_content">
        <h2>登入</h2>
        <p>請輸入您的帳號與密碼</p>
        <div class="input_container">
          <input type="text" placeholder="帳號" />
          <input type="password" placeholder="密碼" />
        </div>
        <div class="btn_container">
          <button @click="submitLogin">登入</button>
          <button @click="closeModal">取消</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);

function closeModal() {
  emit("close");
}

function submitLogin() {
  console.log("登入中...");
  emit("close");
}
</script>

<style scoped lang="scss">
@import "../assets/colors.scss";
.modal_overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal_content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
}

.input_container input {
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn_container button {
  margin: 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  &:hover {
    background-color: #0056b3;
  }
}
</style>
