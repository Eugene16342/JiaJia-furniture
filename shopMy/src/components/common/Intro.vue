<template>
  <div class="intro_container">
    <div class="title">家具首選</div>

    <div class="img_section">
      <div class="img_container">
        <img src="/intro/intro01.jpg" />
      </div>
      <div class="img_container">
        <img src="/intro/intro02.jpg" />
      </div>
      <div class="img_container">
        <img src="/intro/intro03.jpg" />
      </div>
    </div>

    <div class="img_section_rwd">
      <Transition name="fade" mode="out-in">
        <div :key="img" class="img_container">
          <img :src="img" />
        </div>
      </Transition>
    </div>

    <div class="text_container">
      家家家具源於我們對家的熱愛，致力於為每個家庭打造獨一無二的居家體驗。
      <br />從選材到設計，我們的每一件家具都蘊含著工匠們對品質的堅持與生活美學的理解。
      <br />家家家具不僅僅是一個家具品牌，更是一段關於家庭、溫暖與美好生活的故事。
      <br />我們希望每件家具都能成為您生活的一部分，陪伴您度過每一個溫馨的時刻。
    </div>
  </div>
</template>

<script setup>
import { computed, ref, Transition } from "vue";

const imgs = ["/intro/intro01.jpg", "/intro/intro02.jpg", "/intro/intro03.jpg"];
const current = ref(0);
const img = computed(() => imgs[current.value]);

setInterval(() => {
  current.value = (current.value + 1) % imgs.length;
}, 5000);
</script>

<style lang="scss" scoped>
@import "../../assets/colors.scss";

.intro_container {
  max-width: 100vw;
  .title {
    font-size: 3rem;
    text-align: center;
    font-weight: 900;
    margin-bottom: 20px;
    user-select: none;
  }

  .img_section {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    .img_container {
      width: 100%;
      height: 400px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease-in-out;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }

  .text_container {
    text-align: center;
    line-height: 2.5;
    font-weight: 600;
    font-size: 1.1rem;
  }
}

.img_section_rwd {
  display: none;
  justify-content: space-between;

  .img_container {
    width: 100%;
    height: 350px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease-in-out;
    }
  }
}
/* 過渡動畫效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 992px) {
  .intro_container {
    .img_section {
      display: none;
    }
    .img_section_rwd {
      display: flex;
    }
  }
}
</style>
