import { useNotifyStore } from "../stores/notify";

class notification_method {
  constructor() {
    this.timers = new Map(); // 存儲計時器數據
  }

  get notifyStore() {
    // 每次調用時動態獲取 Store，確保在應用啟動後使用
    return useNotifyStore();
  }

  add_notification(text, duration = 10000) {
    const id = Date.now();
    this.notifyStore.add_notification(id, text, duration);

    // 開始倒計時
    this.start_timer({ id, remainingTime: duration });
  }

  start_timer(notification) {
    const timerData = {
      startTime: Date.now(),
      timer: setTimeout(() => {
        this.remove_notification(notification.id);
      }, notification.remainingTime),
    };

    this.timers.set(notification.id, timerData);
  }

  pause_timer(id) {
    const timerData = this.timers.get(id);
    const notification = this.notifyStore.notifications.find(
      (n) => n.id === id
    );
    if (timerData && notification) {
      clearTimeout(timerData.timer); // 暫停計時器
      const elapsed = Date.now() - timerData.startTime; // 計算已過時間
      const remainingTime = notification.remainingTime - elapsed;

      // 更新剩餘時間到 Store
      this.notifyStore.update_notification(id, { remainingTime });
    }
  }

  resume_timer(id) {
    const notification = this.notifyStore.notifications.find(
      (n) => n.id === id
    );
    if (notification && notification.remainingTime > 0) {
      this.start_timer(notification); // 重新啟動計時器
    }
  }

  remove_notification(id) {
    this.notifyStore.remove_notification(id); // 從 Store 移除通知
    this.timers.delete(id); // 刪除計時器數據
  }

  success(message, duration = 10000) {
    this.add_notification(`✅ ${message}`, duration);
  }

  error(message, duration = 10000) {
    this.add_notification(`❌ ${message}`, duration);
  }

  info(message, duration = 10000) {
    this.add_notification(`ℹ️ ${message}`, duration);
  }

  too_many(message, duration = 10000) {
    this.add_notification(`ℹ️ 如需大量訂購，歡迎和我們聯絡!`, duration);
  }

  not_login(duration = 10000) {
    this.add_notification(`🔒 請先登入!`, duration);
  }
}

export default new notification_method();
