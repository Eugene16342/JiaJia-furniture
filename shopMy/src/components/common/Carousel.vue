<template>
  <div
    @mouseenter="stopAutoPlay"
    @mouseleave="startAutoPlay"
    class="carousel_container"
  >
    <div
      class="slides_container"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
    >
      <div v-for="(image, index) in images" :key="index" class="slide">
        <img :src="image" alt="" />
      </div>
    </div>

    <button class="btn_pre" @click="preSlide">
      <icon icon="arrow_left" />
    </button>
    <button class="btn_next" @click="nextSlide">
      <icon icon="arrow_right" />
    </button>

    <div class="dots_container">
      <span
        v-for="(image, index) in images"
        :key="index"
        :class="{ active: currentSlide === index }"
        @click="goToSlide(index)"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import icon from "./The_icon.vue";

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
  autoPlay: {
    type: Boolean,
    default: true,
  },
  interval: {
    type: Number,
    default: 3000,
  },
});

const currentSlide = ref(0);
let autoPlayInterval = "";

// 下一張
function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % props.images.length;
}

// 下一張
function preSlide() {
  currentSlide.value =
    (currentSlide.value - 1 + props.images.length) % props.images.length;
}

// 到指定的投影片
function goToSlide(index) {
  currentSlide.value = index;
}

// 自動撥放投影片
function startAutoPlay() {
  if (props.autoPlay) {
    autoPlayInterval = setInterval(nextSlide, props.interval);
  }
}

// 停止自動撥放
function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

onMounted(() => {
  startAutoPlay();
});

onBeforeUnmount(() => {
  stopAutoPlay();
});
</script>

<style lang="scss" scoped>
@import "../../assets/colors.scss";

.carousel_container {
  position: relative;
  overflow: hidden;
  max-width: 100vw;
  .slides_container {
    display: flex;
    transition: transform 0.5s ease;
    .slide {
      min-width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .btn_pre,
  .btn_next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: $black0;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    z-index: 5;
  }
  .btn_pre {
    left: 0;
  }

  .btn_next {
    right: 0;
  }
  .dots_container {
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 5px;
    span {
      width: 10px;
      height: 10px;
      background-color: $black5;
      border-radius: 50%;
      cursor: pointer;
      &.active {
        background-color: $red;
      }
    }
  }
}
</style>
