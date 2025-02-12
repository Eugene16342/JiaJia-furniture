import { defineStore } from "pinia";
import axios from "axios";

export const use_search_store = defineStore("search", {
  state: () => ({
    categories: [],
    products: [],
    currentPage: 1,
    totalPages: 1,
    selected_category_id: null,
    search_keyword: "", // 當前的搜索關鍵字
    has_results: false, // 是否有結果
  }),
  actions: {
    async fetch_categories() {
      try {
        const response = await axios.get("/api/categorie/get_all_categories");
        this.categories = response.data;
      } catch (error) {
        console.error("無法獲取分類資料:", error);
      }
    },
    // 獲取商品數據
    async fetch_products(page = 1, category_id = null, keyword = null) {
      try {
        // 設置當前的搜索條件（可選）
        if (category_id !== null) this.selected_category_id = category_id;
        if (keyword !== null) this.search_keyword = keyword;

        const response = await axios.get("/api/Product/get_all_products", {
          params: {
            page,
            category_id: this.selected_category_id,
            keyword: this.search_keyword,
          },
        });

        this.products = response.data.products;
        this.totalPages = response.data.totalPages;
        this.currentPage = response.data.currentPage;

        // 更新是否有結果的狀態
        this.has_results = this.products.length > 0;
      } catch (error) {
        console.error("無法獲取商品資料:", error);
        this.has_results = false; // 出現錯誤時認為無結果
      }
    },
    // 當前分類
    set_selected_category(category_id) {
      this.selected_category_id = category_id;
    },
    // 當前頁數
    set_current_page(page) {
      this.currentPage = page;
    },
    // 搜索關鍵字
    set_search_keyword(keyword) {
      this.search_keyword = keyword;
    },
  },
});
