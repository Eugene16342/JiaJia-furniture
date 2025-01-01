import { use_navbar_store, use_auth_store } from "../stores/index";
import axios from "axios";

export const navbarController = {
  async fetch_Categories() {
    const navbar_store = use_navbar_store(); // 引入 Pinia Store
    try {
      const response = await axios.get("/api/categorie/getAllCategories");
      navbar_store.categories = response.data; // 將數據存入 Store
    } catch (error) {
      console.error("無法獲取分類資料:", error);
    }
  },

  // 登入後man icon導向個人頁面
  profile_navigation(router) {
    const navbar_store = use_navbar_store();
    const auth_store = use_auth_store();
    if (auth_store.isAuthenticated) {
      router.push({ name: "profile" }); // 使用 router 導航
      navbar_store.close_all();
    } else {
      navbar_store.toggle_login_container();
    }
  },
};
