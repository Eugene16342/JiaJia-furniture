<template>
  <div class="page">
    <Carousel :images="image_list" :auto_play="true" :interval="5000" />
    <intro />
    <category_link />
    <news />
  </div>
</template>

<script setup>
import Carousel from "../components/common/Carousel.vue";
import Intro from "../components/common/Intro.vue";
import Category_link from "../components/product/Category_link.vue";
import News from "../components/common/News.vue";

const image_list = [
  "/carousel/Carousel01.svg",
  "/carousel/Carousel02.svg",
  "/carousel/Carousel03.svg",
];
</script>

<style scoped></style>
