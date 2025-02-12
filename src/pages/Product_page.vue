<template>
  <div class="page">
    <div class="product_page_container">
      <div class="page_half">
        <Product_img :images="product_store.product.images" />
      </div>
      <div class="page_half info_container">
        <Product_info
          v-if="product_store.product && product_store.product.name"
          ref="productInfoRef"
          :title="product_store.product.name"
          :description="product_store.product.description"
          :materials="product_store.product.materials"
          :colors="product_store.product.colors"
          :original_price="product_store.product.price"
          :discounted_price="product_store.product.discount_price"
          :dimensions="product_store.product.dimensions"
          @color_selected="handle_color_selected"
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
  </div>
</template>

<script setup>
import Product_img from "../components/product/Product_img.vue";
import Product_info from "../components/product/Product_info.vue";
import Amount_counter from "../components/product/Amount_counter.vue";
import Common_btn from "../components/widgets/Common_btn.vue";

import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { use_product_store } from "../stores/index";
import { product_controller } from "../controllers/product_controller";

const route = useRoute();
const product_store = use_product_store();
const product_id = route.params.id;
const quantity = ref(1);
const selected_color = ref(null);

// 接收子組件傳回的選中顏色
function handle_color_selected(color) {
  selected_color.value = color;
}

onMounted(() => {
  product_store.fetch_product(product_id); // 請求商品資料
});

function add_to_cart() {
  product_controller.add_to_cart(
    product_store.product.product_id,
    selected_color.value,
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
