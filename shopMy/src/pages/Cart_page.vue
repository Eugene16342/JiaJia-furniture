<template>
  <div class="cart_page">
    <Title_with_Line title="購物車" />

    <Cart_product_info
      v-for="product in products"
      :key="product.id"
      :product="product"
      @updateQuantity="updateProductQuantity"
      @removeProduct="removeProduct"
    />
    <div class="select_bar">
      <input type="checkbox" id="remove_all" />
      <label for="remove_all">全選</label>
      <div class="btn_container">
        <Common_btn text="批量刪除" fontSize="0.9" />
      </div>
    </div>
    <Title_with_Line title="" />
    <div class="total_price">
      <span>共 10 件商品</span>
      <span> 總計NT$ 999999</span>
    </div>
    <div class="btn_container">
      <Common_btn text="前往付款" fontSize="1.1" />
    </div>
  </div>
</template>

<script setup>
import Title_with_Line from "../widgets/Title_with_Line.vue";
import Cart_product_info from "../widgets/Cart_product_info.vue";
import Common_btn from "../widgets/Common_btn.vue";
import { reactive } from "vue";

const products = reactive([
  {
    id: 1,
    name: "大江東去浪淘竟千古風流人物大江東去浪淘竟",
    model: "A1B2C3D4",
    color: "美麗ㄉ紅色",
    quantity: 1,
    price: 999999,
    selected: false,
  },
  {
    id: 2,
    name: "另一件商品",
    model: "Z9Y8X7W6",
    color: "天藍色",
    quantity: 2,
    price: 12345,
    selected: false,
  },
  {
    id: 3,
    name: "另一件商品",
    model: "Z9Y8X7W6",
    color: "天藍色",
    quantity: 2,
    price: 12345,
    selected: false,
  },
  {
    id: 4,
    name: "另一件商品",
    model: "Z9Y8X7W6",
    color: "天藍色",
    quantity: 2,
    price: 12345,
    selected: false,
  },
]);

function updateProductQuantity({ id, quantity }) {
  const product = products.find((item) => item.id === id);
  if (product) {
    product.quantity = quantity;
  }
}

function removeProduct(id) {
  const index = products.findIndex((item) => item.id === id);
  if (index !== -1) {
    products.splice(index, 1);
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
