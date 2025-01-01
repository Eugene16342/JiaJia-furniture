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
        <Side_category_list
          :categories="store.categories"
          :selected_categoryId="store.selected_categoryId"
          @selectCategory="(categoryId) => handle_category_select(categoryId)"
        />
      </div>
      <div class="serach_section_right">
        <div class="search_bar_container">
          <Search_bar @search="handleSearch" />
        </div>
        <div class="products_container">
          <div v-if="!store.has_results" class="no_results">
            找不到符合條件的商品，請嘗試其他關鍵字或篩選條件。
          </div>
          <Product_card
            v-for="product in store.products"
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
            v-if="store.has_results"
            :totalPages="store.totalPages"
            :currentPage="store.currentPage"
            @update:currentPage="(page) => update_current_page(page)"
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

import { use_search_store } from "../stores/search";
import { search_controller } from "../controllers/search_controller";
import { onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const store = use_search_store();
const controller = search_controller;
const router = useRouter();
const route = useRoute();

onMounted(() => {
  controller.init_search_page(route);
});

function handleSearch(keyword) {
  // 調用 store 的方法進行搜索

  store.fetch_products(1, store.selected_categoryId, keyword);
  console.log(
    "分類是 " +
      store.selected_categoryId +
      "關鍵字是" +
      store.search_keyword +
      "有商品嗎" +
      store.has_results
  );
}

function handle_category_select(categoryId) {
  controller.handle_category_select(categoryId, router, route);
}

function update_current_page(page) {
  controller.update_current_page(page, router, route);
}

watch(
  () => route.query,
  async () => {
    await search_controller.init_search_page(route);
  }
);
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
    .no_results {
      margin: auto;
      font-weight: 600;
      font-size: 1.2rem;
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
