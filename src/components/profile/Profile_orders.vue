<template>
  <div class="profile_info">
    <div class="no_orders" v-if="orders.length == 0">暫時沒有訂單!</div>
    <div class="order_container" v-for="(order, index) in orders" :key="index">
      <!-- 訂單基本資訊 -->
      <div class="order_base_info" @click="toggle_order(index)">
        <span>{{ order.order_id }}</span>
        <span>{{ order.status }}</span>
        <span>${{ order.total_price }}</span>
        <span>訂貨日:{{ order.created_at }}</span>
      </div>

      <!-- 訂單內容 -->
      <transition name="slide-fade">
        <div v-show="expanded_orders[index]" class="orders_item_container">
          <div
            class="order_item"
            v-for="(item, index) in order.items"
            :key="index"
          >
            <div class="img_container">
              <img :src="item.product_images" alt="商品圖片" />
              <div class="product_amount">{{ item.quantity }}</div>
            </div>
            <span class="item_name">
              {{ item.product_name }} <br />
              {{ item.color_name ? item.color_name : "" }}
            </span>
            <span class="item_price">${{ item.price }}</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { use_profile_controller } from "../../controllers/profile_controller";

const { orders, fetch_orders } = use_profile_controller();

// 控制展開的訂單
const expanded_orders = ref({});

// 切換展開狀態
function toggle_order(index) {
  expanded_orders.value[index] = !expanded_orders.value[index];
}

onMounted(async () => {
  try {
    await fetch_orders();
  } catch (error) {
    console.error("無法加載訂單資料");
  }
});
</script>

<style lang="scss" scoped>
@import "../../assets/colors.scss";

.profile_info {
  .no_orders {
    width: auto;
    text-align: center;
    user-select: none;
    font-size: 1.3rem;
  }
  .order_container {
    background-color: $gray;
    border-radius: 5px;
    margin-bottom: 20px;
    .order_base_info {
      display: flex;
      align-items: center;
      justify-content: space-around;
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
        padding: 0 30px;
        margin-bottom: 10px;
        &:last-child {
          margin-bottom: 0;
        }
        .item_name {
          text-align: center;
          padding: 0 10px;
        }
        .item_price {
          padding: 0 10px;
          width: 10%;
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
  max-height: 1000px;
  opacity: 1;
}

@media (max-width: 992px) {
  .profile_info {
    .order_container {
      .orders_item_container {
        .order_item {
          padding: 0;
          .item_price {
            width: 75px;
          }
        }
      }
    }
  }
}
</style>
