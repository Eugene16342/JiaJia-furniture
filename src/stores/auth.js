import { defineStore } from "pinia";

export const use_auth_store = defineStore("auth", {
  state: () => ({
    token: null, // 儲存 JWT Token
    is_log_in: false, // 是否已登入
  }),
  actions: {
    setLoginState(token) {
      this.token = token;
      this.is_log_in = true;
    },
    clearLoginState() {
      this.token = null;
      this.is_log_in = false;
    },
    initialize_auth_state() {
      // 嘗試從 localStorage 或 sessionStorage 中恢復狀態
      const token =
        localStorage.getItem("shopMy_token_local") ||
        sessionStorage.getItem("shopMy_token_session");
      if (token) {
        this.token = token;
        this.is_log_in = true;
      }
    },
  },
});
