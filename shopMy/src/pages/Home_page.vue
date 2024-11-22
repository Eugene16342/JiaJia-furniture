<template>
  <div class="page">
    <Carousel :images="imageList" :autoPlay="true" :interval="5000" />
    <intro />
    <category_link />
    <news />
  </div>
</template>

<script setup>
import icon from "../components/The_icon.vue";
import Carousel from "../widgets/Carousel.vue";
import Intro from "../widgets/Intro.vue";
import Category_link from "../widgets/Category_link.vue";
import News from "../widgets/News.vue";

const imageList = [
  "/carousel/Carousel01.svg",
  "/carousel/Carousel02.svg",
  "/carousel/Carousel03.svg",
];
</script>

<style scoped></style>
