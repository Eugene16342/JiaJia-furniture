import { defineStore } from "pinia";
import { ref } from "vue";

export const use_notify_store = defineStore("notify", () => {
  const notifications = ref([]);

  const add_notification = (id, text) => {
    notifications.value.push({ id, text });
  };

  // 找到該通知的索引值 透過 splice 移除
  const remove_notification = (id) => {
    const index = notifications.value.findIndex((n) => n.id === id);
    if (index !== -1) {
      notifications.value.splice(index, 1);
    }
  };

  return {
    notifications,
    add_notification,
    remove_notification,
  };
});
