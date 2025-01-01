<template>
  <div class="recommend_carousel">
    <Title_with_Line title="你可能會喜歡" />
    <div class="recommend_container_wrapper">
      <button class="scroll_btn left" @click="scrollLeft">‹</button>
      <div ref="scrollContainer" class="recommend_container">
        <Product_card
          v-for="product in recommendedProducts"
          :key="product.id"
          :id="product.id"
          :name="product.name"
          :price="product.price"
          :discount_price="product.discount_price"
          :default_img="product.images[0]"
          :hover_img="product.images[1] || product.images[0]"
        />
      </div>
      <button class="scroll_btn right" @click="scrollRight">›</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import Title_with_Line from "../widgets/Title_with_Line.vue";
import Product_card from "../product/Product_card.vue";
import axios from "axios";

// Props 接收數據
const props = defineProps({
  context: {
    type: String,
    required: true,
    validator: (value) => ["product", "checkout"].includes(value),
  },
  relatedId: {
    type: [Number, String],
    default: null,
  },
});

// 推薦商品數據
const recommendedProducts = ref([]);

// 滾動容器引用
const scrollContainer = ref(null);

// 初始化推薦商品數據
async function fetchRecommendedProducts() {
  if (!props.relatedId) {
    console.warn("沒有提供 relatedId，無法加載推薦商品");
    return;
  }

  try {
    const response = await axios.get(
      `/api/Product/getRecommedProduct/${props.relatedId}`
    );
    recommendedProducts.value = response.data.products || [];
  } catch (error) {
    console.error("無法加載推薦商品:", error);
  }
}

// 滾動功能
function scrollLeft() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  }
}

function scrollRight() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  }
}

// 初始化數據
onMounted(fetchRecommendedProducts);

// 監聽 props 變化
watch(() => props.relatedId, fetchRecommendedProducts);
</script>

<style lang="scss" scoped>
.recommend_carousel {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .recommend_container_wrapper {
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;

    .scroll_btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 2;
      background-color: #ccc;
      border: none;
      padding: 10px;
      font-size: 1.5rem;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        background-color: #aaa;
      }
    }

    .left {
      left: 10px;
    }

    .right {
      right: 10px;
    }

    .recommend_container {
      display: flex;
      gap: 20px;
      overflow-x: hidden;
      scroll-behavior: smooth;

      /* 保持卡片大小 */
      .product_card_container {
        flex-shrink: 0;
      }
    }
  }
}
</style>
