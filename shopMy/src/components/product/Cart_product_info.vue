<template>
  <div class="product_card" @click="toggleDetails">
    <!-- 主商品資訊 -->
    <div class="main_info">
      <span><input class="checkbox" type="checkbox" @click.stop /></span>
      <span class="img_container"
        ><img src="../../public/product/product001.webp"
      /></span>
      <span class="name">{{ product.name }}</span>
      <span class="amount_container">
        <div class="btn" @click.stop="decreaseQuantity">-</div>
        <input
          class="input_container"
          type="number"
          :value="product.quantity"
          @input="updateQuantity($event.target.value)"
          @click.stop
        />
        <div class="btn" @click.stop="increaseQuantity">+</div>
      </span>
      <span class="price">${{ product.price }}</span>
      <span class="btn_container" @click.stop="removeItem"
        ><Comment_btn text="刪除" fontSize="1"
      /></span>
    </div>

    <!-- 詳細資訊（點擊展開） -->
    <transition name="fade">
      <div v-if="detailsVisible" class="details">
        <div>型號: {{ product.model }}</div>
        <div>顏色: {{ product.color }}</div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Common_btn from "../widgets/Common_btn.vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["updateQuantity", "removeProduct"]);

const detailsVisible = ref(false); // 控制詳細資訊是否顯示

function toggleDetails() {
  detailsVisible.value = !detailsVisible.value;
}

function increaseQuantity() {
  emit("updateQuantity", {
    id: props.product.id,
    quantity: props.product.quantity + 1,
  });
}

function decreaseQuantity() {
  if (props.product.quantity > 1) {
    emit("updateQuantity", {
      id: props.product.id,
      quantity: props.product.quantity - 1,
    });
  }
}

function updateQuantity(value) {
  const quantity = Math.max(1, parseInt(value) || 1);
  emit("updateQuantity", { id: props.product.id, quantity });
}

function removeItem() {
  emit("removeProduct", props.product.id);
}
</script>

<style scoped lang="scss">
@import "../../assets/colors.scss";

.product_card {
  width: 100%;
  background: $gray;
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
    .input_container {
      width: 60%;
      border: none;
      text-align: center;
    }
  }
}
</style>
