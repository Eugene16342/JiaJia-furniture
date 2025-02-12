<template>
  <div class="recipient_info">
    <div class="info_container">
      <LabelInput id="who" label="收件人" v-model="recipient" />
    </div>
    <div class="info_container">
      <LabelInput id="where" label="地址" v-model="address" />
    </div>
    <div class="info_container">
      <LabelInput id="phone" label="連絡電話" v-model="phone" />
    </div>
  </div>
</template>

<script setup>
import LabelInput from "../widgets/Common_input.vue";
import { ref } from "vue";

const recipient = ref(""); // 收件人名稱
</script>

<style lang="scss" scoped>
@import "../assets/colors.scss";
.recipient_info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .info_container {
    width: 80%;
  }
}
</style>
