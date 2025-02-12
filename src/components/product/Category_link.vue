<template>
  <div class="category_link_container">
    <div class="category_container">
      <div class="img_container sofa">
        <img src="/category_link/sofa.jpg" />
        <router-link
          to="/search?category=%25E6%25B2%2599%25E7%2599%25BC"
          class="category_hover"
          >沙發
          <icon color="wheat" icon="sofa" />
        </router-link>
      </div>
      <div class="img_container light">
        <img src="/category_link/light.jpg" />
        <router-link
          to="/search?category=%25E7%2587%2588%25E5%2585%25B7"
          class="category_hover"
          >燈具
          <icon color="wheat" icon="light" />
        </router-link>
      </div>

      <div class="img_container desk">
        <img src="/category_link/desktop.jpg" />
        <router-link
          to="/search?category=%25E6%25A1%258C%25E6%25AB%2583"
          class="category_hover"
          >桌櫃
          <icon color="wheat" icon="desk" />
        </router-link>
      </div>

      <div class="img_container bed">
        <img src="/category_link/bed.jpg" />
        <router-link
          to="/search??category=%25E5%25BA%258A%25E5%2585%25B7"
          class="category_hover"
          >床具
          <icon color="wheat" icon="bed" />
        </router-link>
      </div>
      <div class="img_container chair">
        <img src="/category_link/chair.jpg" />
        <router-link
          to="/search?category=%25E6%25A4%2585%25E5%2587%25B3"
          class="category_hover"
          >椅子
          <icon color="wheat" icon="chair" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import icon from "../common/The_icon.vue";
</script>

<style lang="scss" scope>
@import "../../assets/colors.scss";

.category_link_container {
  .category_container {
    max-width: 1000px;
    margin: auto;
    display: grid;
    justify-content: center;
    gap: 20px;
    grid-template-rows: repeat(2, 250px);
    grid-template-columns: repeat(5, 1fr);
    grid-template-areas:
      "sofa sofa light bed chair"
      " sofa sofa light desk desk";
    .sofa {
      grid-area: sofa;
    }
    .light {
      grid-area: light;
    }
    .desk {
      grid-area: desk;
    }
    .bed {
      grid-area: bed;
    }
    .chair {
      grid-area: chair;
    }
    .img_container {
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: fill;
      }
      .category_hover {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: $black6;
        top: 0;
        opacity: 0;
        transition: opacity 0.3s ease;
        font-size: 2rem;
        color: $wheat;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
}

@media (max-width: 992px) {
  .category_link_container {
    padding: 0 50px;
    .category_container {
      grid-template-rows: repeat(3, 300px);
      grid-template-columns: repeat(2, 1fr);
      grid-template-areas:
        "sofa light "
        " desk desk"
        " bed chair";
    }
  }
}
</style>
