import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotifyStore = defineStore("notify", () => {
  const notifications = ref([]);

  const add_notification = (id, text, remainingTime) => {
    notifications.value.push({ id, text, remainingTime });
  };

  const update_notification = (id, updates) => {
    const notification = notifications.value.find((n) => n.id === id);
    if (notification) {
      Object.assign(notification, updates);
    }
  };

  const remove_notification = (id) => {
    const index = notifications.value.findIndex((n) => n.id === id);
    if (index !== -1) {
      notifications.value.splice(index, 1);
    }
  };

  return {
    notifications,
    add_notification,
    update_notification,
    remove_notification,
  };
});
