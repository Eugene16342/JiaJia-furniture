<template>
  <div class="pagination_container">
    <!-- 上一頁 -->
    <span
      class="btn_container"
      :class="{ disabled: currentPage === 1 }"
      @click="prevPage"
    >
      <icon icon="arrow_left" />
    </span>

    <!-- 頁碼 -->
    <span
      v-for="page in totalPages"
      :key="page"
      class="btn_container"
      :class="{ active: currentPage === page }"
      @click="changePage(page)"
    >
      {{ page }}
    </span>

    <!-- 下一頁 -->
    <span
      class="btn_container"
      :class="{ disabled: currentPage === totalPages }"
      @click="nextPage"
    >
      <icon icon="arrow_right" />
    </span>
  </div>
</template>

<script setup>
import icon from "../components/The_icon.vue";
import { defineProps, defineEmits } from "vue";

// 接收 props
defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
});

// 定義事件
const emit = defineEmits(["update:currentPage"]);

// 切換到指定頁
function changePage(page) {
  if (page !== currentPage) {
    emit("update:currentPage", page);
  }
}

// 上一頁
function prevPage() {
  if (currentPage > 1) {
    emit("update:currentPage", currentPage - 1);
  }
}

// 方法：下一頁
function nextPage() {
  if (currentPage < totalPages) {
    emit("update:currentPage", currentPage + 1);
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/colors.scss";

.pagination_container {
  display: flex;
  .btn_container {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    width: 30px;
    border: 1px solid $black4;
    border-radius: 5px;
    background-color: $white;
    margin: 0 10px;
    text-align: center;
    cursor: pointer;
    &:hover {
      color: $red;
    }
  }
}
</style>
