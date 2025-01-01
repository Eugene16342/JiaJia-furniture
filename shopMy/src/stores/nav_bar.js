import { defineStore } from "pinia";

export const use_navbar_store = defineStore("nav_bar", {
  state: () => ({
    is_hamburger_menu_open: false,
    is_login_container_open: false,
    isMenuOpen: {
      products: false,
      news: false,
      about: false,
    },
    categories: [], // 初始化 categories
  }),
  actions: {
    toggle_hamburger_menu() {
      this.is_hamburger_menu_open = !this.is_hamburger_menu_open;
      this.close_list();
    },
    toggle_list(menu) {
      this.isMenuOpen[menu] = !this.isMenuOpen[menu];
    },
    close_list() {
      Object.keys(this.isMenuOpen).forEach((key) => {
        this.isMenuOpen[key] = false;
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
      Object.keys(this.isMenuOpen).forEach((key) => {
        this.isMenuOpen[key] = false;
      });
    },
  },
});
