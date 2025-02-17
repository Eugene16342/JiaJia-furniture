<template>
  <div class="cart_page">
    <Title_with_Line title="購物車" />

    <!-- 購物車內的商品 -->
    <Cart_product_info
      v-for="product in cart_store.cart_items"
      :key="`${product.id}-${product.color_id}`"
      :product="product"
      v-model="product.selected"
      @update:quantity="(newQuantity) => updateQuantity(product, newQuantity)"
      @toggle_select="toggleSelectItem"
      @remove_item="remove_this_one"
    />

    <div v-if="cart_store.cart_items.length === 0" class="no_product">
      購物車內暫無商品!
    </div>

    <!-- 批量刪除按鈕 -->
    <div class="select_bar">
      <input type="checkbox" id="remove_all" @change="select_all" />
      <label for="remove_all">全選</label>
      <div class="btn_container">
        <Common_btn text="批量刪除" fontSize="0.9" @click="remove_selected" />
      </div>
    </div>

    <!-- 总价 -->
    <Title_with_Line title="" />
    <div class="total_price">
      <span>共 {{ cart_store.select_total_items }} 件商品</span>
      <span>總計NT$ {{ cart_store.total_price }}</span>
    </div>

    <!-- 前往付款 -->
    <div class="btn_container">
      <Common_btn text="前往付款" fontSize="1.1" @click="go_to_payment" />
    </div>
  </div>
</template>

<script setup>
import Title_with_Line from "../components/widgets/Title_with_Line.vue";
import Cart_product_info from "../components/product/Cart_product_info.vue";
import Common_btn from "../components/widgets/Common_btn.vue";

import { useRouter } from "vue-router";
import {
  use_cart_store,
  use_auth_store,
  use_navbar_store,
} from "../stores/index";
import { cart_controller } from "../controllers/cart_controller";
import notification_method from "../controllers/notify_controller";
import { onMounted, watch } from "vue";

const cart_store = use_cart_store();
const auth_store = use_auth_store();
const nav_store = use_navbar_store();
const router = useRouter();

// 加載 localStorage 的資訊
onMounted(async () => {
  const auth_store = use_auth_store();
  const cart_store = use_cart_store();

  if (auth_store.isAuthenticated) {
    await cart_store.init_cart();
  }
  await cart_controller.fetch_cart_items();

  window.scrollTo({
    top: 0,
    behavior: "smooth", // 平滑滾動
  });
});

// 更新數量
function updateQuantity(product, newQuantity) {
  cart_store.update_quantity(product.product_id, product.color_id, newQuantity);
}

// toggle 項目
function toggleSelectItem(productId, colorId) {
  cart_store.toggleSelectItem(productId, colorId);
}

// 全選
function select_all(event) {
  cart_store.select_all(event.target.checked);
}

// 刪除選擇項目
function remove_selected() {
  cart_store.remove_selected();
}

function remove_this_one(productId, colorId) {
  cart_store.remove_this_one(productId, colorId);
}

function go_to_payment() {
  if (!auth_store.token) {
    notification_method.info("請先登入");
    nav_store.toggle_login_container();
  } else {
    if (cart_store.selected_items.length === 0) {
      notification_method.info("請選擇要結帳的商品!");
    } else {
      router.push({
        path: "/payment",
      });
      console.log(cart_store.selected_items);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/colors.scss";

.cart_page {
  width: 100%;
  min-height: 80vh;
  gap: 20px;
  .btn_container {
    width: 50%;
    margin-left: auto;
    margin-top: 20px;
  }
  .no_product {
    display: flex;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: 600;
  }
  .select_bar {
    width: 165px;
    margin-left: auto;
    label {
      cursor: pointer;
    }
    .btn_container {
      display: inline;
      width: auto;
      margin-left: 20px;
      padding: 0 5px;
    }
  }
  .total_price {
    font-weight: 600;
    font-size: 1.2rem;
    display: flex;
    justify-content: space-between;
  }
}

@media (max-width: 992px) {
  .cart_page {
    padding: 0 20px;
  }
}
</style>
