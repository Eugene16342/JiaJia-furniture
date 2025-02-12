<template>
  <div class="list_container">
    <div
      class="list_title"
      :class="{ active: category.category_id === selected_category_id }"
      v-for="category in categories"
      :key="category.category_id"
      @click="select_category(category.category_id)"
    >
      {{ category.name_zh }}
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

// 接收父組件傳遞的數據
const props = defineProps({
  categories: { type: Array, required: true },
  selected_category_id: { type: Number, default: null }, // 當前選中的分類 ID
});

const emit = defineEmits(["select_category"]); // 定義事件

// 通知父組件選擇了分類
function select_category(category_id) {
  emit("select_category", category_id);
}
</script>

<style lang="scss" scoped>
@import "../../assets/colors.scss";

.list_container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  .list_title {
    background-color: $white;
    width: 100px;
    font-weight: 600;
    font-size: 1.1rem;
    border: 1px solid $red;
    padding: 5px;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
    transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
    &:hover,
    &.active {
      color: $red;
      background-color: $wheat;
    }
  }
}

@media (max-width: 992px) {
  .list_container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: auto;
    gap: 10px;
  }
}
</style>
