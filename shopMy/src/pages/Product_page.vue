<template>
  <div class="page">
    <div class="product_page_container">
      <div class="page_half">
        <Product_img
          :images="store.product.images"
          :initialImage="store.product.images[0]"
        />
      </div>
      <div class="page_half info_container">
        <Product_info
          v-if="store.product && store.product.name"
          ref="productInfoRef"
          :title="store.product.name"
          :description="store.product.description"
          :materials="store.product.materials"
          :colors="store.product.colors"
          :originalPrice="store.product.price"
          :discountedPrice="store.product.discount_price"
          :dimensions="store.product.dimensions"
          @colorSelected="handleColorSelected"
        />
        <div class="add_to_cart">
          <div class="amount_container">
            <Amount_counter v-model="quantity" :min="1" :max="10" />
          </div>
          <div class="btn_container">
            <Common_btn text="加入購物車" @click="add_to_cart" />
          </div>
        </div>
      </div>
    </div>
    <!--
    <div class="recommend_container">
      <Recommend context="product" :relatedId="store.product.categoryId" />
    </div>
    -->
  </div>
</template>

<script setup>
import Product_img from "../components/product/Product_img.vue";
import Product_info from "../components/product/Product_info.vue";
import Amount_counter from "../components/product/Amount_counter.vue";
import Common_btn from "../components/widgets/Common_btn.vue";
import Recommend from "../components/common/Recommend.vue";

import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { use_product_store } from "../stores/index";
import { product_controller } from "../controllers/product_controller";

const route = useRoute();
const store = use_product_store(); // 初始化 Pinia Store
const product_id = route.params.id; // 從 URL 提取商品 ID
const quantity = ref(1); // 追蹤購買數量
const selectedColor = ref(null); // 追蹤選中的顏色

// 接收子組件傳回的選中顏色
function handleColorSelected(color) {
  selectedColor.value = color;
}

onMounted(() => {
  store.fetch_product(product_id); // 請求商品資料

  // 滾動到最頂部
  window.scrollTo({
    top: 0,
    behavior: "smooth", // 平滑滾動
  });
});

function add_to_cart() {
  product_controller.add_to_cart(
    store.product.product_id,
    selectedColor.value,
    quantity.value
  );
}
</script>

<style lang="scss" scoped>
@import "../assets/colors.scss";

.product_page_container {
  max-width: 100%;
  display: flex;
  gap: 20px;
  .page_half {
    width: 50%;
    background-color: $gray;
  }
  .info_container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 0 30px 0;
    .add_to_cart {
      width: 80%;
      margin: auto;
      .amount_container {
        width: 80%;
        max-width: 250px;
        margin: auto;
        margin-bottom: 20px;
      }
      .btn_container {
        width: 100%;
        max-width: 500px;
        height: 40px;
        margin: auto;
      }
    }
  }
}

@media (max-width: 992px) {
  .product_page_container {
    display: flex;
    flex-direction: column;
    .page_half {
      width: 100vw;
    }
  }
}
</style>
