<template>
  <div class="profile_info">
    <div class="order_container" v-for="(order, index) in orders" :key="index">
      <!-- 訂單基本信息 -->
      <div class="order_base_info" @click="toggleOrder(index)">
        <span>{{ order.id }}</span>
        <span>{{ order.status }}</span>
        <span>{{ order.amount }}</span>
        <span>{{ order.date }}</span>
      </div>

      <!-- 訂單商品信息 -->
      <transition name="slide-fade">
        <div v-show="expandedOrders[index]" class="orders_item_container">
          <div class="order_item" v-for="(item, i) in order.items" :key="i">
            <div class="img_container">
              <img :src="item.image" alt="商品圖片" />
              <div class="product_amount">{{ item.quantity }}</div>
            </div>
            <span>{{ item.name }}</span>
            <span>{{ item.model }}</span>
            <span>{{ item.price }}</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 模擬訂單數據
const orders = ref([
  {
    id: "A1B2C3D4",
    status: "已完成",
    amount: "1234",
    date: "2023-11-10",
    items: [
      {
        name: "商品名稱 1",
        model: "型號 1",
        price: "100",
        image: "../../public/product/product001.webp",
        quantity: 5,
      },
      {
        name: "商品名稱 2",
        model: "型號 2",
        price: "200",
        image: "../../public/product/product001.webp",
        quantity: 3,
      },
    ],
  },
  {
    id: "D4E5F6G7",
    status: "處理中",
    amount: "5678",
    date: "2023-11-09",
    items: [
      {
        name: "商品名稱 3",
        model: "型號 3",
        price: "300",
        image: "../../public/product/product001.webp",
        quantity: 2,
      },
    ],
  },
]);

// 控制展開的訂單
const expandedOrders = ref({});

// 切換展開狀態
function toggleOrder(index) {
  expandedOrders.value[index] = !expandedOrders.value[index];
}
</script>

<style lang="scss" scoped>
@import "../../assets/colors.scss";

.profile_info {
  .order_container {
    background-color: $gray;
    border-radius: 5px;
    margin-bottom: 20px;
    .order_base_info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: $wheat;
      padding: 15px;
      border-radius: 5px 5px 0 0;
      border: 2px solid $black5;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
      &:hover {
        background-color: lighten($wheat, 5%);
      }
    }
    .orders_item_container {
      border: 2px solid $black5;
      border-radius: 0 0 5px 5px;
      border-top: none;
      padding: 10px 5px;
      .order_item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: $gray;
        margin-bottom: 10px;
        &:last-child {
          margin-bottom: 0;
        }
        .img_container {
          width: 80px;
          position: relative;
          img {
            width: 100%;
            object-fit: cover;
            border-radius: 5px;
          }
          .product_amount {
            position: absolute;
            top: -5px;
            right: -5px;
            min-width: 25px;
            min-height: 25px;
            padding: 0 5px;
            background-color: $black5;
            display: flex;
            align-items: center;
            justify-content: center;
            color: $white;
            border-radius: 50px;
          }
        }
      }
    }
  }
}

/* 動畫效果 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-in-out;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  max-height: 0;
  opacity: 0;
}
.slide-fade-enter-to,
.slide-fade-leave-from {
  max-height: 1000px; /* 依據內容高度調整 */
  opacity: 1;
}
</style>
