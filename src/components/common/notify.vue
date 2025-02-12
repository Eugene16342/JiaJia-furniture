<template>
  <div class="notify_list">
    <TransitionGroup name="slide">
      <div
        class="notify_container"
        v-for="item in notifications"
        :key="item.id"
        @click="remove_notification(item.id)"
      >
        {{ item.text }}
        <div class="timer"></div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import notification_method from "../../controllers/notify_controller";
import { use_notify_store } from "../../stores/index";

const notify_store = use_notify_store();
const notifications = notify_store.notifications;

const remove_notification = (id) => {
  notification_method.remove_notification(id);
};
</script>

<style lang="scss" scoped>
@import "../../assets/colors.scss";

.notify_list {
  position: fixed;
  width: 230px;
  top: 100px;
  right: 5%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 15;
}

.notify_container {
  position: relative;
  background-color: $white;
  color: $primary;
  width: 230px;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 1px 4px 5px $black3;
  font-weight: 900;
  cursor: pointer;

  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: $wheat;
  }
  .timer {
    width: 100%;
    height: 10px;
    background-color: $red;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 5px;
    animation: count_down 10s linear forwards;
  }
}

/* 定義 Keyframes 動畫 */
@keyframes count_down {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

/* 進場與離場動畫 */
.slide-enter-active {
  animation: slide_in 0.5s ease-out;
}

.slide-leave-active {
  animation: slide_out 0.5s ease-out;
  z-index: 10;
  position: absolute; /* 離場時脫離文檔流 */
}

/* 移動時的平滑過渡 */
.slide-move {
  transition: transform 0.5s ease;
}

/* Keyframes 動畫 */
@keyframes slide_in {
  from {
    transform: translateY(500px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide_out {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-300px);
    opacity: 0;
  }
}
</style>
