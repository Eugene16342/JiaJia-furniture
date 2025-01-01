<template>
  <div class="app_container">
    <nav_bar />

    <!-- 網格內容區域 -->
    <div class="content_grid">
      <div class="grid_left"></div>
      <div class="grid_content">
        <notify />
        <loading />
        <router-view />
      </div>
      <div class="grid_right"></div>
    </div>
    <footer_bar />
  </div>
</template>

<script setup>
import "animate.css";
import "./assets/base.css";
import The_icon from "./components/common/The_icon.vue";
import nav_bar from "./components/common/Nav_bar.vue";
import footer_bar from "./components/common/Footer_bar.vue";
import notify from "./components/common/notify.vue";
import loading from "./components/widgets/loading.vue";

import { onMounted } from "vue";
import { use_cart_store } from "./stores/cart";

onMounted(() => {
  const cart_store = use_cart_store();
  cart_store.init_cart(); // 初始化購物車狀態
});
</script>

<style lang="scss" scoped>
.app_container {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.content_grid {
  display: grid;
  flex: 1;
  grid-template-columns: 1fr repeat(10, 1fr) 1fr; /* 左右各1格 中間10格 */
  width: 100%;
  padding: 100px 0 20px 0;
}

.grid_left,
.grid_right {
  background-color: transparent;
}

.grid_content {
  grid-column: span 10;
}

@media (max-width: 992px) {
  .content_grid {
    grid-template-columns: 1fr; /* 單列佈局 */
    justify-content: center;
    overflow-x: hidden;
    .grid_left,
    .grid_right {
      display: none;
    }

    .grid_content {
      grid-column: 1 / -1; /* 單列佈局時的正確範圍 */
    }
  }
}
</style>
