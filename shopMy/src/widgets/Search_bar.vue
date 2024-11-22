<template>
  <div class="search_bar_container">
    <input placeholder="請輸入關鍵字" />
    <span>搜尋</span>
  </div>
</template>

<script setup>
import icon from "../components/The_icon.vue";
</script>

<style lang="scss" scoped>
@import "../assets/colors.scss";
.search_bar_container {
  input {
    border: 1px solid $black5;
    border-radius: 5px 0 0 5px;
    padding: 5px;
    color: $primary;
  }
  span {
    border: 1px solid $black5;
    border-left: none;
    background-color: $gray;
    padding: 5px;
    display: flex;
    align-items: center;
    font-weight: 600;
    cursor: pointer;
    border-radius: 0 5px 5px 0;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    &:hover {
      background-color: $wheat;
      color: $red;
    }
  }
}
</style>
