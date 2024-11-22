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
        <Side_category_list />
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
            :image="product.image"
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
import Side_category_list from "../widgets/Side_category_list.vue";
import Title_with_Line from "../widgets/Title_with_Line.vue";
import Search_bar from "../widgets/Search_bar.vue";
import Product_card from "../widgets/Product_card.vue";
import Pagination from "../widgets/Pagination.vue";

const products = [
  {
    id: 1,
    name: "我是家具名稱",
    price: 1000,
    discount_price: 800,
    image: "../../public/product/product001.webp",
  },
  {
    id: 2,
    name: "另一件家具",
    price: 1200,
    discount_price: null,
    image: "../../public/product/product001.webp",
  },
  {
    id: 2,
    name: "另一件家具",
    price: 1200,
    discount_price: null,
    image: "../../public/product/product001.webp",
  },
  {
    id: 2,
    name: "另一件家具",
    price: 1200,
    discount_price: null,
    image: "../../public/product/product001.webp",
  },
  {
    id: 2,
    name: "另一件家具",
    price: 1200,
    discount_price: null,
    image: "../../public/product/product001.webp",
  },
  {
    id: 2,
    name: "另一件家具",
    price: 1200,
    discount_price: null,
    image: "../../public/product/product001.webp",
  },
];
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
    }
  }
}
</style>
