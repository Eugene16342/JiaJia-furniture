import { defineStore } from "pinia";
import axios from "axios";

export const use_search_store = defineStore("search", {
  state: () => ({
    categories: [],
    products: [],
    currentPage: 1,
    totalPages: 1,
    selected_categoryId: null,
    search_keyword: "", // 當前的搜索關鍵字
    has_results: true, // 是否有結果
  }),
  actions: {
    async fetch_categories() {
      try {
        const response = await axios.get("/api/categorie/getAllCategories");
        this.categories = response.data;
      } catch (error) {
        console.error("無法獲取分類資料:", error);
      }
    },
    // 獲取商品數據
    async fetch_products(page = 1, categoryId = null, keyword = null) {
      try {
        // 設置當前的搜索條件（可選）
        if (categoryId !== null) this.selected_categoryId = categoryId;
        if (keyword !== null) this.searchKeyword = keyword;

        const response = await axios.get("/api/Product/getAllProducts", {
          params: {
            page,
            categoryId: this.selected_categoryId,
            keyword: this.searchKeyword,
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
    set_selected_category(categoryId) {
      this.selected_categoryId = categoryId;
    },
    set_current_page(page) {
      this.currentPage = page;
    },
    // 設置搜索關鍵字
    set_search_keyword(keyword) {
      this.search_keyword = keyword;
    },

    // 重置過濾條件（用於清空分類與搜索條件）
    reset_filters() {
      this.selected_categoryId = null;
      this.search_keyword = "";
      this.currentPage = 1;
    },
  },
});
