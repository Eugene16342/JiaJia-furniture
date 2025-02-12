<template>
  <div class="product_info">
    <div class="info_title">{{ title }}</div>
    <div class="info_description">{{ description }}</div>

    <div v-if="materials" class="materials">
      <ul>
        <li v-for="material in materials.split(' / ')" :key="material">
          {{ material }}
        </li>
      </ul>
    </div>

    <!-- 尺寸資訊 -->
    <div class="select_title">
      長：{{ dimensions.length }} 公分<br />
      寬：{{ dimensions.width }} 公分<br />
      高：{{ dimensions.height }} 公分
    </div>

    <!-- 顏色選擇 -->
    <div v-if="colors && colors.length > 0" class="select_title">
      顏色
      <div
        v-for="color in colors"
        :key="color.color_id"
        class="select_box"
        :class="{ active: selected_color?.color_id === color.color_id }"
        @click="select_color(color)"
      >
        {{ color.name }}
        <div class="color_box" :style="{ backgroundColor: color.hex }"></div>
      </div>
    </div>

    <!-- 價格資訊 -->
    <div class="info_price">
      <div>
        <span
          >原價
          <span :class="{ price: discounted_price }">{{
            original_price
          }}</span></span
        >
      </div>
      <div class="off_price" v-if="discounted_price">
        <span>特價</span><span>{{ discounted_price }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";

defineProps({
  title: { type: String, default: "未命名商品" },
  description: { type: String, default: "暫無描述" },
  materials: { type: String, default: "" },
  dimensions: {
    type: Object,
    default: () => ({ length: 0, width: 0, height: 0 }),
  },
  colors: { type: Array, default: () => [] },
  original_price: { type: [Number, String], default: "未知" },
  discounted_price: { type: [Number, String], default: null },
});

const emit = defineEmits(["color_selected"]);

// 響應式變量，存儲當前選中的顏色
const selected_color = ref(null);

function select_color(color) {
  selected_color.value = color;
  emit("color_selected", color);
}
</script>

<style lang="scss" scoped>
@import "../../assets/colors.scss";

.product_info {
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 40px;

  .info_title {
    font-weight: 900;
    font-size: 2rem;
  }

  .materials {
    font-weight: 600;
  }

  .select_title {
    font-weight: 600;
    .select_box {
      display: inline-block;
      align-items: center;
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
      .color_box {
        display: inline-block;
        width: 30px;
        height: 15px;
        border-radius: 3px;
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
