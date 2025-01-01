<template>
  <nav class="navbar">
    <router-link to="/">
      <img @click="navbar_store.close_hamburger_menu" src="/base/Logo.png" />
    </router-link>

    <!-- 一般狀態的導覽列 -->
    <div class="navbar_right">
      <div
        class="text_hover title"
        @mouseenter="navbar_store.isMenuOpen.products = true"
        @mouseleave="navbar_store.isMenuOpen.products = false"
      >
        全部商品
        <transition name="dropdown">
          <div v-show="navbar_store.isMenuOpen.products" class="dropdown">
            <router-link
              v-for="category in navbar_store.categories"
              :key="category.category_id"
              :to="{
                path: '/search',
                query: { category: encodeURIComponent(category.name_zh) },
              }"
            >
              {{ category.name_zh }}
            </router-link>
          </div>
        </transition>
      </div>

      <div
        class="text_hover title"
        @mouseenter="navbar_store.isMenuOpen.about = true"
        @mouseleave="navbar_store.isMenuOpen.about = false"
      >
        關於我們
        <transition name="dropdown">
          <div v-show="navbar_store.isMenuOpen.about" class="dropdown">
            <router-link to="/concept">品牌理念</router-link>
            <router-link to="/">聯繫我們</router-link>
          </div>
        </transition>
      </div>
      <div class="text_hover title" @click="notifyLatestNews">最新消息</div>
      <div
        v-if="auth_store.isAuthenticated"
        class="text_hover title"
        @click="logout"
      >
        登出
      </div>
      <icon icon="man" @click="profile_navigation" />
      <router-link to="/cart">
        <icon icon="cart" />
        <div v-show="cart_total_items !== 0" class="cart_items">
          {{ cart_total_items }}
        </div>
      </router-link>
    </div>

    <!-- 小於992px的導覽列 -->
    <div
      class="hamberger_list_toggle"
      :class="{ open: navbar_store.is_hamburger_menu_open }"
      @click="navbar_store.toggle_hamburger_menu"
    >
      <div
        class="icon_wrapper"
        :class="{ rotate_icon: navbar_store.is_hamburger_menu_open }"
      >
        <icon icon="list" />
      </div>

      <div>
        <div class="hamberger_list" @click.stop>
          <div
            class="text_hover title"
            :class="{ active: navbar_store.isMenuOpen.products }"
            @click="navbar_store.toggle_list('products')"
          >
            全部商品
          </div>
          <transition name="listdown">
            <div v-show="navbar_store.isMenuOpen.products" class="list">
              <router-link
                v-for="category in navbar_store.categories"
                :key="category.category_id"
                @click="navbar_store.close_hamburger_menu"
                :to="{
                  path: '/search',
                  query: { category: encodeURIComponent(category.name_zh) },
                }"
              >
                {{ category.name_zh }}
              </router-link>
            </div>
          </transition>
          <div
            class="text_hover title"
            :class="{ active: navbar_store.isMenuOpen.about }"
            @click="navbar_store.toggle_list('about')"
          >
            關於我們
          </div>
          <transition name="listdown">
            <div v-show="navbar_store.isMenuOpen.about" class="list">
              <router-link to="/concept">品牌理念</router-link>
              <router-link to="/">關於我們之類的</router-link>
            </div>
          </transition>
          <div class="text_hover title">最新消息</div>
          <div
            v-if="auth_store.isAuthenticated"
            class="text_hover title"
            @click="logout"
          >
            登出
          </div>
          <div class="list_icon_container">
            <icon icon="man" @click="profile_navigation" />
            <router-link to="/cart">
              <icon icon="cart" />
              <div v-show="cart_total_items !== 0" class="cart_items">
                {{ cart_total_items }}
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <login_register_container
      v-if="navbar_store.is_login_container_open"
      @close="navbar_store.is_login_container_open = false"
    />
  </nav>
</template>

<script setup>
import Icon from "./The_icon.vue";
import login_register_container from "../login/login_register_container.vue";
import login_Logic from "../../controllers/login_controller";

import { ref, onMounted, computed } from "vue";
import {
  use_navbar_store,
  use_auth_store,
  use_cart_store,
} from "../../stores/index";

import { navbarController } from "../../controllers/nav_bar_controller";

import { useRouter } from "vue-router";
const router = useRouter(); // 獲取 router
const navbar_store = use_navbar_store();
const auth_store = use_auth_store();
const cart_store = use_cart_store();

onMounted(() => {
  navbarController.fetch_Categories(); // 初始化時調用控制器的方法
  console.log("isAuthenticated:", auth_store.isAuthenticated);
  console.log("toekn:", auth_store.token);
});

import NotificationService from "../../controllers/notify_controller";

const notifyLatestNews = () => {
  NotificationService.error("你點擊最新消息");
};

const { logout } = login_Logic();

const profile_navigation = () => {
  navbarController.profile_navigation(router); // 傳遞 router
};

const cart_total_items = computed(() => cart_store.total_items);
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

// 購物車數量的數字
a {
  position: relative;
  .cart_items {
    position: absolute;
    right: -9px;
    top: -7px;
    color: $white;
    font-weight: 600;
    font-size: 0.8rem;
    padding: 2px;
    width: 20px;
    height: 20px;
    background-color: $red;
    text-align: center;
    border-radius: 50px;
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
