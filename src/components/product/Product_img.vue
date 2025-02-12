<template>
  <div class="image_carousel">
    <div class="show_img_container">
      <img :src="main_image" />
    </div>
    <div class="replace_img_container_wrapper">
      <button class="scroll_btn left" @click="scrollLeft">‹</button>
      <div ref="scroll_container" class="replace_img_container">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="replace_img"
          @click="change_main_image(image)"
        >
          <img :src="image" />
        </div>
      </div>
      <button class="scroll_btn right" @click="scrollRight">›</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
});

// 主要展示的圖片
const main_image = ref("");

// 初始化主圖片 當 props.images 有內容時設置第一張
watch(
  () => props.images,
  () => {
    if (props.images.length > 0) {
      main_image.value = props.images[0];
    }
  }
);

// 點擊縮略圖改變主圖片
function change_main_image(image) {
  main_image.value = image;
}

const scroll_container = ref(null);

// 滾動功能
function scrollLeft() {
  scroll_container.value.scrollBy({
    left: -200,
    behavior: "smooth",
  });
}

function scrollRight() {
  scroll_container.value.scrollBy({
    left: 200,
    behavior: "smooth",
  });
}
</script>

<style lang="scss" scoped>
@import "../../assets/colors.scss";
.image_carousel {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;

  .show_img_container {
    width: 100%;

    img {
      width: 100%;
      object-fit: contain;
    }
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
