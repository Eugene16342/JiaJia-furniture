import { defineStore } from "pinia";
import { use_cart_store } from "./index";

export const use_navbar_store = defineStore("nav_bar", {
  state: () => ({
    is_hamburger_menu_open: false,
    is_login_container_open: false,
    is_menu_open: {
      products: false,
      news: false,
      about: false,
    },
    categories: [],
    cart_total_items: 0,
  }),
  actions: {
    toggle_hamburger_menu() {
      this.is_hamburger_menu_open = !this.is_hamburger_menu_open;
      this.close_list();
    },
    toggle_list(menu) {
      this.is_menu_open[menu] = !this.is_menu_open[menu];
    },
    close_list() {
      Object.keys(this.is_menu_open).forEach((key) => {
        this.is_menu_open[key] = false;
      });
    },
    toggle_login_container() {
      this.is_login_container_open = !this.is_login_container_open;
      this.is_hamburger_menu_open = false;
      this.close_list();
    },
    close_all() {
      this.is_hamburger_menu_open = false;
      this.is_login_container_open = false;
      Object.keys(this.is_menu_open).forEach((key) => {
        this.is_menu_open[key] = false;
      });
    },
  },
  getters: {
    // 計算當前購物車商品的數量
    cart_total_items() {
      const cart_store = use_cart_store();
      return cart_store.total_items;
    },
  },
});
