<template>
  <div class="image_carousel">
    <div class="show_img_container">
      <img :src="mainImage" />
    </div>
    <div class="replace_img_container_wrapper">
      <button class="scroll_btn left" @click="scrollLeft">‹</button>
      <div ref="scrollContainer" class="replace_img_container">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="replace_img"
          @click="changeMainImage(image)"
        >
          <img :src="image" />
        </div>
      </div>
      <button class="scroll_btn right" @click="scrollRight">›</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Props 用於接收調用組件時傳遞的圖片數據
const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
  initialImage: {
    type: String,
    default: "", // 默認展示的圖片
  },
});

// 主要展示的圖片
const mainImage = ref(props.initialImage || props.images[0]);

// 滾動容器
const scrollContainer = ref(null);

// 滾動功能
function scrollLeft() {
  scrollContainer.value.scrollBy({
    left: -200, // 調整滾動步距
    behavior: "smooth",
  });
}

function scrollRight() {
  scrollContainer.value.scrollBy({
    left: 200, // 調整滾動步距
    behavior: "smooth",
  });
}

// 點擊縮略圖改變主圖片
function changeMainImage(image) {
  mainImage.value = image;
}
</script>

<style lang="scss" scoped>
@import "../../assets/colors.scss";
.image_carousel {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .show_img_container {
    width: 100%;
    object-fit: contain;
  }
  .replace_img_container_wrapper {
    position: relative;
    display: flex;
    align-items: center;
    margin-top: 10px;
    overflow: hidden;

    .scroll_btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 2;
      background-color: $black3;
      color: $white;
      border: none;
      cursor: pointer;
      padding: 10px;
      font-size: 1.5rem;
      border-radius: 5px;
      transition: background-color 0.2s ease-in-out;
      &:hover {
        background-color: $black6;
      }
    }

    .left {
      left: 1%;
    }
    .right {
      right: 1%;
    }

    .replace_img_container {
      display: flex;
      overflow-x: hidden;
      scroll-behavior: smooth;
      gap: 10px;

      .replace_img {
        width: 200px;
        flex-shrink: 0;
        overflow: hidden;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>
