import { use_cart_store, use_auth_store } from "../stores/index";
import notification_method from "../controllers/notify_controller";
import axios from "axios";

export const cart_controller = {
  // 請求完整的商品資訊 用於展示畫面
  async fetch_cart_items() {
    const cart_store = use_cart_store();
    let cart = cart_store.cart_items;
    try {
      if (!cart.length) {
        return;
      }

      const response = await axios.post("/api/cart/get_cart_base_inf", cart);
      const detailed_cart = response.data.map((res) => {
        const cart_item = cart.find(
          (item) =>
            item.product_id === res.product_id && item.color_id === res.color_id
        );

        // 結合請求返回的資訊
        return {
          ...res,
          quantity: cart_item.quantity,
          color_name: res.color_name ? res.color_name : "無",
        };
      });

      cart_store.set_cart(detailed_cart);
    } catch (error) {
      console.error("購物車初始化失敗:", error);
      notification_method.error("無法載入購物車資訊！");
    }
  },

  // 登入後 如果 localStorage 內有商品 詢問是否將 localStoreage 的商品同步到該帳號
  async sync_cart_items_to_user() {
    try {
      const auth_store = use_auth_store();
      const token = auth_store.token;
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      // 如果購物車數據為空 直接返回
      if (cart.length === 0) {
        notification_method.info("購物車是空的，無需同步");
        return;
      }

      const response = await axios.post(
        "/api/cart/sync_cart_items",
        { cart },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      notification_method.success("同步購物車成功!");
      localStorage.removeItem("cart");
      return response.data;
    } catch (error) {
      console.error("購物車同步失敗:", error);
      notification_method.error("同步購物車失敗!");
      throw error;
    }
  },
};
