<template>
  <div class="page_small">
    <div class="img_container"></div>
    <Title_with_Line
      title="產品介紹"
      fontSize="1.5rem"
      fontWeight="600"
      lineHeight="1px"
    />

    <div class="search_section">
      <div class="serach_section_left">
        <Side_category_list :categories="categories" />
      </div>
      <div class="serach_section_right">
        <div class="search_bar_container">
          <Search_bar />
        </div>
        <div class="products_container">
          <!-- 使用 v-for 循環渲染商品卡片 -->
          <Product_card
            v-for="product in products"
            :key="product.id"
            :id="product.id"
            :name="product.name"
            :price="product.price"
            :discount_price="product.discount_price"
            :default_img="product.default_img"
            :hover_img="product.hover_img"
          />
        </div>
        <div class="pagination_container">
          <Pagination
            :totalPages="totalPages"
            :currentPage="currentPage"
            @update:currentPage="updateCurrentPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Side_category_list from "../components/product/Side_category_list.vue";
import Title_with_Line from "../components/widgets/Title_with_Line.vue";
import Search_bar from "../components/widgets/Search_bar.vue";
import Product_card from "../components/product/Product_card.vue";
import Pagination from "../components/common/Pagination.vue";

import { ref, onMounted } from "vue";
import axios from "axios";

// 初始化分類和產品資料
const categories = ref([]);
const products = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const itemsPerPage = "";

async function fetchProducts(page = 1) {
  try {
    const response = await axios.get("/api/Product/getAllProducts", {
      params: { page, limit: itemsPerPage },
    });
    products.value = response.data.products;
    totalPages.value = response.data.totalPages;
    currentPage.value = response.data.currentPage;
  } catch (error) {
    console.error("無法獲取商品資料:", error);
  }
}

onMounted(async () => {
  try {
    // 獲取分類資料
    const categoriesResponse = await axios.get(
      "/api/categorie/getAllCategories"
    );
    categories.value = categoriesResponse.data;

    // 初始載入商品
    await fetchProducts();
  } catch (error) {
    console.error("無法獲取資料:", error);
  }
});

function updateCurrentPage(page) {
  if (page !== currentPage.value) {
    fetchProducts(page);
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/colors.scss";

.img_container {
  background-image: url(../../public/base/SerchBG.jpg);
  max-width: 100vw;
  height: 200px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.search_section {
  display: flex;
  gap: 10px;
  .serach_section_left {
    width: 10%;
  }
  .serach_section_right {
    width: 90%;
    .products_container {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .search_bar_container {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 10px;
      padding: 0 40px;
    }
    .pagination_container {
      display: flex;
      justify-content: center;
      margin: 20px 0;
    }
  }
}

@media (max-width: 992px) {
  .search_section {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 0 20px;
    gap: 30px;
    .serach_section_left {
      width: 100%;
    }
    .serach_section_right {
      width: 100%;
      .search_bar_container {
        padding: 0;
      }
    }
  }
}
</style>
