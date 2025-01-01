<template>
  <div class="product_card_container">
    <router-link :to="`/product/${id}/${name}`" class="img_container">
      <!-- 默認圖片 -->
      <img :src="default_img" :alt="name" class="default_image" />
      <!-- 懸停圖片 -->
      <img :src="hover_img" :alt="name" class="hover_image" />
    </router-link>
    <div class="info_container">
      <router-link :to="`/product/${id}/${name}`" class="title">{{
        name
      }}</router-link>
      <div class="price_container">
        <div class="price" v-if="discount_price">
          <span class="line-through">{{ price }}</span>
        </div>
        <div class="off_price">
          {{ discount_price || price }}
        </div>
      </div>
      <router-link :to="`/product/${id}/${name}`" class="watch_detail"
        >查看詳細</router-link
      >
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  id: Number,
  name: String,
  price: String,
  discount_price: Number,
  default_img: String,
  hover_img: String,
});
</script>

<style lang="scss" scoped>
@import "../../assets/colors.scss";

.product_card_container {
  max-width: 220px;
  height: 380px;
  border: 1px solid $black3;
  border-radius: 5px;
  background-color: $white;
  .img_container {
    width: 100%;
    position: relative;
    img {
      width: 100%;
      height: 220px;
      object-fit: contain;
    }
    .default_image {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 1;
      transition: opacity 0.3s ease-in-out;
      &:hover {
        opacity: 0;
      }
    }
  }
  .info_container {
    padding: 10px;
    .title {
      font-weight: 600;
      transition: color 0.2s ease-in-out;
      &:hover {
        color: $red;
      }
    }
    .price_container {
      height: 42px;
      .price {
        text-decoration: line-through;
        font-size: 1.1rem;
      }
      .off_price {
        font-size: 1.1rem;
        font-weight: 600;
      }
    }

    .watch_detail {
      display: block;
      width: 120px;
      background-color: $primary;
      color: $white;
      text-align: center;
      margin: auto;
      margin-top: 20px;
      padding: 10px;
      font-weight: 900;
      border: 1px solid $gray;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
      &:hover {
        background-color: $wheat;
        color: $primary;
      }
    }
  }
}
</style>
