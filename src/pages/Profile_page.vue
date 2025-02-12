<template>
  <div class="profile_page page">
    <div class="img_container"></div>

    <div class="select_bar">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        :class="{ active: active_tab === item.key }"
        @click="select_tab(item.key)"
      >
        {{ item.label }}
      </span>
    </div>

    <div class="content_area">
      <transition name="fade" mode="out-in">
        <component :is="current_component" :key="active_tab" />
      </transition>
    </div>
  </div>
</template>

<script setup>
import Profile_info from "../components/profile/Profile_info.vue";
import Profile_orders from "../components/profile/Profile_orders.vue";

import { ref, computed } from "vue";

const tabs = [
  { key: "profile", label: "會員資料", component: Profile_info },
  { key: "orders", label: "訂單一覽", component: Profile_orders },
];

// 預設是個人資訊
const active_tab = ref("profile");

// 切換 tab
const select_tab = (tab_key) => {
  active_tab.value = tab_key;
};

// 計算當前要顯示的組件
const current_component = computed(() => {
  const current_tab = tabs.find((tab) => tab.key === active_tab.value);
  return current_tab ? current_tab.component : null;
});
</script>

<style lang="scss" scoped>
@import "../assets/colors.scss";

.profile_page {
  display: flex;

  .img_container {
    background-image: url(../../public/base/SerchBG.jpg);
    width: 100%;
    height: 200px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .select_bar {
    font-size: 1.2rem;
    font-weight: 600;
    width: 60%;
    display: flex;
    justify-content: space-between;
    margin: 20px auto;
    border: 2px solid $black4;
    border-radius: 5px;

    span {
      width: 100%;
      text-align: center;
      border-left: 2px solid $black4;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      &:hover,
      &.active {
        background-color: $red;
        color: $white;
      }
      &:first-child {
        border-left: none;
        border-radius: 3px 0 0 3px;
      }
      &:last-child {
        border-radius: 0 3px 3px 0;
      }
    }
  }

  .content_area {
    width: 100%;
    padding: 20px;
    .profile_info {
      display: flex;
      flex-direction: column;
      width: 60%;
      margin: auto;
      margin-bottom: 50px;
    }
  }
}
/* 添加動畫效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 992px) {
  .profile_page {
    .select_bar {
      width: 80%;
    }
    .content_area {
      .profile_info {
        width: 90%;
      }
    }
  }
}
</style>
