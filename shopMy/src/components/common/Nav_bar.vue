<template>
  <nav class="navbar">
    <router-link to="/"><img src="/base/Logo.png" /></router-link>

    <!-- 一般狀態的導覽列 -->
    <div class="navbar_right">
      <div
        class="text_hover title"
        @mouseenter="showMenu('products')"
        @mouseleave="hideMenu('products')"
      >
        全部商品
        <transition name="dropdown">
          <div v-show="isMenuOpen.products" class="dropdown">
            <router-link to="/">全部商品之類的 待補</router-link>
          </div>
        </transition>
      </div>

      <div
        class="text_hover title"
        @mouseenter="showMenu('about')"
        @mouseleave="hideMenu('about')"
      >
        關於我們
        <transition name="dropdown">
          <div v-show="isMenuOpen.about" class="dropdown">
            <router-link to="/concept">品牌理念</router-link>
            <router-link to="/">聯繫我們</router-link>
          </div>
        </transition>
      </div>
      <div class="text_hover title">最新消息</div>
      <icon icon="man" @click="toggleLoginRegisterContainer" />
      <icon icon="cart" />
    </div>

    <!-- 小於992px的導覽列 -->
    <div
      class="hamberger_list_toggle"
      :class="{ open: isHamburgerMenuOpen }"
      @click="toggleHamburgerMenu"
    >
      <div class="icon_wrapper" :class="{ rotate_icon: isHamburgerMenuOpen }">
        <icon icon="list" :isActive="isIconActive" />
      </div>

      <div>
        <div class="hamberger_list" @click.stop>
          <div
            class="text_hover title"
            :class="{ active: isMenuOpen.products }"
            @click="toggleList('products')"
          >
            全部商品
          </div>
          <transition name="listdown">
            <div v-show="isMenuOpen.products" class="list">
              <router-link to="/">全部商品之類的 待補</router-link>
              <router-link to="/">全部商品之類的 待補</router-link>
              <router-link to="/">全部商品之類的 待補</router-link>
            </div>
          </transition>
          <div
            class="text_hover title"
            :class="{ active: isMenuOpen.about }"
            @click="toggleList('about')"
          >
            關於我們
          </div>
          <transition name="listdown">
            <div v-show="isMenuOpen.about" class="list">
              <router-link to="/concept">品牌理念</router-link>
              <router-link to="/">關於我們之類的</router-link>
              <router-link to="/">關於我們之類的</router-link>
            </div>
          </transition>
          <div class="text_hover title">最新消息</div>
          <div class="list_icon_container">
            <icon icon="man" @click="toggleLoginRegisterContainer" />
            <icon icon="cart" />
          </div>
        </div>
      </div>
    </div>
    <login_register_container
      v-if="isLoginComponentOpen"
      @close="isLoginComponentOpen = false"
    />
  </nav>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeUnmount, Transition } from "vue";
import Icon from "./The_icon.vue";
import login_register_container from "../login/login_register_container.vue";

// 菜單開啟狀態
const isMenuOpen = reactive({
  products: false,
  news: false,
  about: false,
});

const isIconActive = ref(false);

const isHamburgerMenuOpen = ref(false); // 控制漢堡表單的顯示狀態

function showMenu(menu) {
  isMenuOpen[menu] = true;
}

function hideMenu(menu) {
  isMenuOpen[menu] = false;
}

function toggleList(listName) {
  isMenuOpen[listName] = !isMenuOpen[listName];
}

function toggleHamburgerMenu() {
  isHamburgerMenuOpen.value = !isHamburgerMenuOpen.value;
  isIconActive.value = !isIconActive.value;
}

const isLoginComponentOpen = ref(false);

function toggleLoginRegisterContainer() {
  isLoginComponentOpen.value = !isLoginComponentOpen.value;
}
</script>

<style lang="scss" scoped>
@import "../../assets/colors.scss";
.navbar {
  display: flex;
  justify-content: space-between;
  height: 80px;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: $wheat;
  padding: 0 100px;
  z-index: 10;
  img {
    height: 80px;
    padding: 10px;
    user-select: none;
  }
  .navbar_right {
    display: flex;
    align-items: center;
    gap: 50px;
    .title {
      display: flex;
      align-items: center;
      user-select: none;
      position: relative;
      height: 100%;
      font-weight: 600;
      &::after {
        content: "";
        position: absolute;
        top: 70%;
        left: 0;
        width: 0;
        height: 2px;
        background-color: $red;
        transition: width 0.2s ease;
      }

      &:hover::after {
        width: 100%;
      }
      .dropdown {
        position: absolute;
        min-width: 150px;
        top: 100%;
        left: 0;
        background-color: $white;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        border-radius: 4px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        pointer-events: none;
        a {
          color: $primary;
          width: 100%;
          padding: 10px;
          &:hover {
            background-color: $gray;
            color: $red;
          }
        }
      }
      &:hover .dropdown {
        opacity: 1;
        pointer-events: auto;
      }
    }
  }
  .hamberger_list_toggle {
    display: none;
  }
}

// Transition效果
.listdown-enter-active,
.listdown-leave-active {
  transition: all 0.2s ease-in-out;
}

.listdown-enter-from,
.listdown-leave-to {
  max-height: 0px;
  opacity: 0;
}

.listdown-enter-to,
.listdown-leave-from {
  max-height: 300px;
  opacity: 1;
}

@media (max-width: 992px) {
  .navbar {
    padding: 0 20px;
    .navbar_right {
      display: none;
    }
    .hamberger_list_toggle {
      display: flex;
      align-items: center;
      position: relative;
      .icon_wrapper {
        display: inline-block;
        transition: transform 0.2s ease-in-out; /* 平滑旋轉效果 */
        transform: rotate(0deg); /* 初始狀態 */

        &:hover {
          transform: rotate(90deg); /* 點擊時旋轉 90 度 */
        }

        &.rotate_icon {
          transform: rotate(90deg); /* 點擊時旋轉 90 度 */
        }
      }
      .hamberger_list {
        position: absolute;
        top: 100%;
        width: 250px;
        right: -80%;
        background-color: $white;
        border-radius: 0 0 0 10px;
        padding: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // 陰影效果
        transform: translateX(100%); // 初始位置在畫面外
        transition: transform 0.3s ease; // 滑入效果
      }
      &.open .hamberger_list {
        transform: translateX(0); // 滑入畫面
      }
      .title {
        font-weight: 600;
        user-select: none;
        font-size: 1.2rem;
        margin: 10px 0;
        text-align: center;
        &:hover {
          background-color: $gray;
        }
        &.active {
          background-color: $gray;
          color: $red;
        }
      }
      .list {
        display: flex;
        flex-direction: column;
        gap: 15px;

        a {
          display: inline-block;
          text-align: center;

          &:hover {
            background-color: $gray;
            color: $red;
          }
        }
      }
      .list_icon_container {
        display: flex;
        justify-content: space-around;
      }
    }
  }
}
</style>
