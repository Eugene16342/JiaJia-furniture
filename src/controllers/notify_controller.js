import { use_notify_store } from "../stores/index";

class notification_method {
  get notify_store() {
    return use_notify_store();
  }

  // 初始化計時器
  constructor() {
    this.timers = new Map();
  }

  start_timer(id) {
    const timer_data = {
      timer: setTimeout(() => {
        this.remove_notification(id);
      }, 10000),
    };

    this.timers.set(id, timer_data);
  }

  add_notification(text) {
    const id = Date.now();
    this.notify_store.add_notification(id, text);

    // 開始倒計時
    this.start_timer(id);
  }

  remove_notification(id) {
    this.notify_store.remove_notification(id); // 從 Store 移除通知
    this.timers.delete(id); // 刪除計時器數據
  }

  success(message) {
    this.add_notification(`✅ ${message}`);
  }

  error(message) {
    this.add_notification(`❌ ${message}`);
  }

  info(message) {
    this.add_notification(`ℹ️ ${message}`);
  }

  too_many() {
    this.add_notification(`ℹ️ 如需大量訂購，歡迎和我們聯絡!`);
  }

  not_login() {
    this.add_notification(`🔒 請先登入!`);
  }
}

export default new notification_method();
