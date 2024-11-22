<template>
  <div class="profile_info">
    <div class="describe">收錄最近30筆瀏覽</div>
    <router-link to="/" class="product_card">
      <div class="img_container">
        <img src="../../public/product/product001.webp" />
      </div>
      <div class="product_info">
        <span>商品名稱</span><span>描述</span><span>商品價格</span>
      </div>
    </router-link>
    <router-link to="/" class="product_card">
      <div class="img_container">
        <img src="../../public/product/product001.webp" />
      </div>
      <div class="product_info">
        <span>商品名稱</span><span>描述</span><span>商品價格</span>
      </div>
    </router-link>

    <div class="page_container">
      <pagination
        :totalPages="totalPages"
        :currentPage="currentPage"
        @update:currentPage="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import common_input from "./Common_input.vue";
import common_btn from "./Common_btn.vue";
import pagination from "./Pagination.vue";

import { ref } from "vue";

// 設置總頁數和當前頁
const totalPages = ref(10); // 總共10頁
const currentPage = ref(1); // 當前在第1頁

// 處理頁碼更改
function handlePageChange(newPage) {
  console.log("頁碼已更改為：", newPage);
  currentPage.value = newPage;
}
</script>

<style lang="scss" scoped>
@import "../assets/colors.scss";

.describe {
  margin: auto;
  margin-bottom: 20px;
}
.product_card {
  display: flex;
  align-items: center;
  background-color: $gray;
  padding: 5px;
  border: 1px solid $black3;
  border-radius: 5px;
  margin-bottom: 15px;
  .img_container {
    width: 80px;
  }
  .product_info {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}

.page_container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
