<template>
  <div class="product_info">
    <div class="info_title">{{ title }}</div>
    <div class="info_description">{{ description }}</div>
    <div class="info_feature">{{ features }}</div>

    <!-- 尺寸選擇 -->
    <div class="select_title">
      尺寸
      <span
        v-for="size in sizes"
        :key="size"
        class="select_box"
        :class="{ active: selectedSize === size }"
        @click="toggleSelection('size', size)"
      >
        {{ size }}
      </span>
    </div>

    <!-- 顏色選擇 -->
    <div class="select_title">
      顏色
      <span
        v-for="color in colors"
        :key="color"
        class="select_box"
        :class="{ active: selectedColor === color }"
        @click="toggleSelection('color', color)"
      >
        {{ color }}
      </span>
    </div>

    <!-- 價格資訊 -->
    <div class="info_price">
      <div>
        <span
          >原價 <span class="price">{{ originalPrice }}</span></span
        >
      </div>
      <div class="off_price">
        <span>特價 </span><span>{{ discountedPrice }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

// Props 接收父組件傳遞的數據
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  features: {
    type: String,
    required: true,
  },
  sizes: {
    type: Array,
    required: true,
  },
  colors: {
    type: Array,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    required: true,
  },
});

// 狀態
const selectedSize = ref(null);
const selectedColor = ref(null);
const amount = ref(0);

// 方法
function toggleSelection(type, value) {
  if (type === "size") {
    selectedSize.value = selectedSize.value === value ? null : value;
  } else if (type === "color") {
    selectedColor.value = selectedColor.value === value ? null : value;
  }
}

function increaseAmount() {
  amount.value += 1;
}

function decreaseAmount() {
  if (amount.value > 0) {
    amount.value -= 1;
  }
}

function updateAmount(value) {
  amount.value = Math.max(0, parseInt(value) || 0);
}

function addToCart() {
  if (!selectedSize.value || !selectedColor.value) {
    alert("請選擇尺寸和顏色");
    return;
  }

  console.log("加入購物車", {
    size: selectedSize.value,
    color: selectedColor.value,
    quantity: amount.value,
  });
}
</script>

<style lang="scss" scoped>
@import "../assets/colors.scss";

.product_info {
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 40px;

  .info_title {
    font-weight: 900;
    font-size: 2rem;
  }

  .select_title {
    font-weight: 600;
    .select_box {
      margin: 0 10px;
      border: 1px solid $primary;
      padding: 3px;
      border-radius: 5px;
      cursor: pointer;
      transition: color 0.1s ease-in, background-color 0.1s ease-in;
      &:hover,
      &.active {
        color: $red;
        background-color: $wheat;
      }
    }
  }

  .info_price {
    display: flex;
    flex-direction: column;
    font-weight: 900;
    font-size: 2rem;
    gap: 20px;
    .price {
      text-decoration: line-through;
      text-decoration-color: $red;
    }
  }
}
</style>
