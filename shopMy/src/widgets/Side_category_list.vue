<template>
  <div class="list_container">
    <div
      class="list_title"
      :class="{ active: selectedIndex === index }"
      v-for="(title, index) in titles"
      :key="index"
      @click="toggleActive(index)"
    >
      {{ title }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const titles = [
  "全部",
  "全部2",
  "全部3",
  "全部2",
  "全部3",
  "全部2",
  "全部3",
  "全部2",
  "全部3",
  "全部2",
];
const selectedIndex = ref(null);

function toggleActive(index) {
  selectedIndex.value = selectedIndex.value === index ? null : index;
}
</script>

<style lang="scss" scoped>
@import "../assets/colors.scss";

.list_container {
  .list_title {
    width: 100px;
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 20px;
    padding: 5px;
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
    flex-wrap: wrap;
    margin: auto;
    .list_title {
      border: 1px solid $red;
      margin: -1px 0 0 -1px; // 解決border重疊的問題
    }
  }
}
</style>
