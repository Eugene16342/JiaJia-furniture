<template>
  <div class="product_card" @click="toggleDetails">
    <!-- 主商品資訊 -->
    <div class="main_info">
      <span
        ><input
          class="checkbox"
          type="checkbox"
          :checked="product.selected"
          @change="toggle_select"
          @click.stop
      /></span>
      <span class="img_container">
        <img :src="product.image" alt="商品圖片" :title="product.name" />
      </span>
      <span class="name">{{ product.name }}</span>
      <span class="amount_container">
        <div class="btn" @click.stop="decreaseAmount">-</div>
        <input
          class="amount"
          type="number"
          :value="props.product.quantity"
          @input="update_amount($event.target.value)"
          @blur="handle_blur"
          @keydown="handle_keydown"
        />
        <div class="btn" @click.stop="increaseAmount">+</div>
      </span>
      <span class="price">${{ props.product.quantity * product.price }}</span>
      <span class="btn_container">
        <Common_btn text="刪除" fontSize="1" @click.stop="remove_this_one" />
      </span>
    </div>

    <!-- 詳細資訊（點擊展開） -->
    <transition name="fade">
      <div v-if="detail_toggle" class="details">
        <div>顏色: {{ product.color_name }}</div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, defineEmits, watch } from "vue";
import Common_btn from "../widgets/Common_btn.vue";
import { use_cart_store } from "../../stores/index";
import { cart_controller } from "../../controllers/cart_controller";
import { product_controller } from "../../controllers/product_controller";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const detail_toggle = ref(false);

function toggle_select() {
  emit("toggle_select", props.product.product_id, props.product.color_id);
}

function toggleDetails() {
  detail_toggle.value = !detail_toggle.value;
}

const emit = defineEmits(["update:quantity", "toggle_select", "remove_item"]);

// 增加數量
function increaseAmount() {
  emit("update:quantity", props.product.quantity + 1); // 通知父組件更新數量
}

// 減少數量
function decreaseAmount() {
  if (props.product.quantity > 1) {
    emit("update:quantity", props.product.quantity - 1); // 通知父組件更新數量
  }
}

function remove_this_one() {
  emit("remove_item", props.product.product_id, props.product.color_id);
}

// 處理失焦事件
function handle_blur() {
  console.log(props.product.quantity);
  const validValue = product_controller.blur_to_min(props.product.quantity);
  emit("update:quantity", validValue);
}

function handle_keydown(event) {
  product_controller.prevent_key_down(event);
}

function update_amount(value) {
  const newValue = Number(value);
  emit("update:quantity", newValue);
}

watch(
  () => props.product.quantity,
  (newValue) => {
    const validValue = product_controller.limit_quantity(newValue); // 使用控制器檢查範圍
    if (validValue !== newValue) {
      emit("update:quantity", validValue); // 修正數值後再通知父組件
    }
  }
);
</script>

<style scoped lang="scss">
@import "../../assets/colors.scss";

.product_card {
  width: 100%;
  background-color: $gray;
  cursor: pointer;
  border: 1px solid $black2;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  .main_info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    .checkbox {
      accent-color: $red;
    }
    .img_container {
      width: 60px;
      img {
        border-radius: 5px;
      }
    }
    .name {
      width: 40%;
      font-weight: 600;
    }
    .price {
      width: 15%;
      min-width: 60px;
    }
    .btn_container {
      width: 50px;
    }
  }
  .details {
    font-weight: 600;
    margin-top: 10px;
    padding: 5px;
    background: $gray;
    border-top: 1px solid $black3;
  }
  .amount_container {
    display: flex;
    align-items: center;
    width: 100px;
    height: 30px;

    .btn {
      width: 20%;
      text-align: center;
      cursor: pointer;
      background-color: $black3;
      color: $white;
      user-select: none;
      &:hover {
        background-color: $black8;
      }
    }
    .amount {
      width: 60%;
      border: none;
      text-align: center;
    }
  }
}
</style>
