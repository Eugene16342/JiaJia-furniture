import { defineStore } from "pinia";
import axios from "axios";

export const use_product_store = defineStore("product", {
  state: () => ({
    product: {
      product_id: null,
      name: "",
      description: "",
      materials: "",
      dimensions: {
        length: 0,
        width: 0,
        height: 0,
      },
      price: 0,
      discount_price: null,
      category_id: null,
      status: "",
      images: [],
      colors: [],
    },
  }),
  actions: {
    async fetch_product(product_id) {
      try {
        const response = await axios.get(
          `/api/product/get_product_by_id/${product_id}`
        );
        this.product = response.data;
      } catch (error) {
        console.error("無法獲取商品詳細資訊：", error);
      }
    },
  },
});
