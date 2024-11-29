<template>
  <div class="profile_info">
    <div class="input_container">
      <common_input
        id="name"
        label="請輸入舊密碼"
        placeholder="請輸入舊密碼"
        :showLabel="true"
        v-model="userName"
      />
      <common_input
        id="name"
        label="請輸入新密碼"
        placeholder="請輸入新密碼"
        :showLabel="true"
        v-model="userName"
      />
      <common_input
        id="name"
        label="再次輸入新密碼"
        placeholder="再次輸入新密碼"
        :showLabel="true"
        v-model="userName"
      />
    </div>
    <common_btn text="確認修改" />
  </div>
</template>

<script setup>
import common_input from "../widgets/Common_input.vue";
import common_btn from "../widgets/Common_btn.vue";
</script>

<style lang="scss" scoped>
@import "../../assets/colors.scss";
</style>
