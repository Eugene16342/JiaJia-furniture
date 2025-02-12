import { defineStore } from "pinia";

export const use_loading_store = defineStore("loading", {
  state: () => ({
    isLoading: false,
  }),
  actions: {
    showLoading() {
      this.isLoading = true;
    },
    hideLoading() {
      this.isLoading = false;
    },
  },
});
