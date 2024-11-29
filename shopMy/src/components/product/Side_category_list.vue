<template>
  <div class="list_container">
    <div
      class="list_title"
      :class="{ active: selectedIndex === index }"
      v-for="(category, index) in categories"
      :key="category.id"
      @click="toggleActive(index)"
    >
      {{ category.name_zh }}
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";

// 接收父組件傳遞的分類數據
const { categories } = defineProps({
  categories: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["categoryClick"]); // 定義事件

const selectedIndex = ref(null);

function toggleActive(index) {
  selectedIndex.value = selectedIndex.value === index ? null : index;
  const categoryId = categories[index]?.id; // 獲取選中的分類 ID
  emit("categoryClick", categoryId); // 傳遞分類 ID 給父組件
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
