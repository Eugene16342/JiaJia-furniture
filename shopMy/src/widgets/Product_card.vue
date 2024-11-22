<template>
  <div class="product_card_container">
    <router-link :to="`/product/${id}`" class="img_container">
      <img :src="image" :alt="name" />
    </router-link>
    <div class="info_container">
      <router-link :to="`/product/${id}`" class="title">{{ name }}</router-link>
      <div class="price_container">
        <div class="price" v-if="discount_price">
          <span class="line-through">{{ price }}</span>
        </div>
        <div class="off_price">
          {{ discount_price || price }}
        </div>
      </div>
      <div class="add_to_cart">放入購物車</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: Number,
  name: String,
  price: Number,
  discount_price: Number,
  image: String,
});
</script>

<style lang="scss" scoped>
@import "../assets/colors.scss";

.product_card_container {
  max-width: 220px;
  height: 380px;
  border: 1px solid $black3;
  border-radius: 5px;
  background-color: $white;
  .img_container {
    width: 100%;
    img {
      width: 100%;
      height: 220px;
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

    .add_to_cart {
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
