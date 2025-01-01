<template>
  <div class="search_bar_container">
    <input
      v-model="keyword"
      @keydown.enter="onSearch"
      placeholder="請輸入關鍵字"
    />
    <span @click="onSearch">搜尋</span>
  </div>
</template>

<script setup>
import { ref } from "vue";
import icon from "../common/The_icon.vue";

// 定義可以觸發的事件
const emit = defineEmits(["search"]); // 定義 'search' 事件

const keyword = ref(""); // 關鍵字的數據綁定

function onSearch() {
  emit("search", keyword.value); // 發送事件，將輸入的值傳遞給父組件
}
</script>

<style lang="scss" scoped>
@import "../../assets/colors.scss";
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
