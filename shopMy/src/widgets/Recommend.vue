<template>
  <div>
    <Title_with_Line title="你可能會喜歡" />

    <div class="recommend_container">
      <router-link to="/" class="product_card">
        <div class="img_container">
          <img src="../../public/product/product001.webp" />
        </div>
        <div class="title">好用家具</div>
      </router-link>
      <router-link to="/" class="product_card">
        <div class="img_container">
          <img src="../../public/product/product001.webp" />
        </div>
        <div class="title">好用家具</div>
      </router-link>
      <router-link to="/" class="product_card">
        <div class="img_container">
          <img src="../../public/product/product001.webp" />
        </div>
        <div class="title">好用家具</div>
      </router-link>
      <router-link to="/" class="product_card">
        <div class="img_container">
          <img src="../../public/product/product001.webp" />
        </div>
        <div class="title">好用家具</div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import Title_with_Line from "./Title_with_Line.vue";
</script>

<style lang="scss" scoped>
@import "../assets/colors.scss";

.recommend_container {
  width: 100%;
  display: flex;
  justify-content: space-around;
  .product_card {
    width: 20%;
    max-width: 250px;
    display: inline-block;
    transition: color 0.2s ease-in-out;
    &:hover {
      color: $red;
    }
    .img_container {
      width: 100%;
    }
    .title {
      text-align: center;
      font-weight: 600;
      font-size: 1.1rem;
      margin-top: 10px;
    }
  }
}
</style>
