import { use_navbar_store, use_auth_store } from "../stores/index";
import axios from "axios";

export const navbarController = {
  async fetch_Categories() {
    const navbar_store = use_navbar_store();
    try {
      const response = await axios.get("/api/categorie/get_all_categories");
      navbar_store.categories = response.data;
    } catch (error) {
      console.error("無法獲取分類資料:", error);
    }
  },
};
