<template>
  <div class="notify_list">
    <TransitionGroup name="slide">
      <div
        class="notify_container"
        v-for="item in notifications"
        :key="item.id"
        @click="remove_notification(item.id)"
        @mouseenter="pause_timer(item.id)"
        @mouseleave="resume_timer(item.id)"
      >
        {{ item.text }}
        <div class="timer"></div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import notification_method from "../../controllers/notify_controller";
import { useNotifyStore } from "../../stores/notify";

const notifyStore = useNotifyStore();
const notifications = notifyStore.notifications;

const remove_notification = (id) => {
  notification_method.remove_notification(id);
};

const pause_timer = (id) => {
  notification_method.pause_timer(id);
};

const resume_timer = (id) => {
  notification_method.resume_timer(id);
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

    .timer {
      animation-play-state: paused;
    }
  }
  .timer {
    width: 100%;
    height: 10px;
    background-color: $red;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 5px;
    animation: shrink 10s linear forwards; // 使用 CSS 動畫控制寬度縮短
  }
}

/* 定義 Keyframes 動畫 */
@keyframes shrink {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

/* 進場與離場動畫 */
.slide-enter-active {
  animation: slide-in 0.5s ease-out;
}

.slide-leave-active {
  animation: slide-out 0.5s ease-out;
  z-index: 10;
  position: absolute; /* 離場時脫離文檔流 */
}

/* 移動時的平滑過渡 */
.slide-move {
  transition: transform 0.5s ease;
}

/* Keyframes 動畫 */
@keyframes slide-in {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
