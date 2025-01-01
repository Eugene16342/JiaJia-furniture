import { use_cart_store, use_auth_store } from "../stores/index";
import notification_method from "../controllers/notify_controller";
import axios from "axios";

export const cart_controller = {
  async fetch_cart_items() {
    const cart_store = use_cart_store();
    let cart = cart_store.cart_items;
    try {
      if (!cart.length) {
        cart_store.setCart([]); // 如果購物車為空，清空狀態
        return;
      }

      // 向 API 請求完整的商品資訊
      const response = await axios.post(
        "/api/cart/get_localstorage_base_info",
        cart
      ); // 假設 API 路徑為此
      const detailedCart = response.data.map((res) => {
        // 合併 API 返回的資料與購物車內的數量
        const cart_item = cart.find(
          (item) =>
            item.product_id === res.product_id && item.color_id === res.color_id // 需要匹配 color_id
        );

        return {
          ...res,
          quantity: cart_item ? cart_item.quantity : 1,
          color_name: res.color_name ? res.color_name : "無",
        };
      });

      // 更新 Pinia 狀態
      cart_store.setCart(detailedCart);
    } catch (error) {
      console.error("購物車初始化失敗:", error);
      notification_method.error("無法載入購物車資訊！");
    }
  },

  async sync_cart_items_to_user() {
    try {
      const auth_store = use_auth_store();
      const token = auth_store.token;
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      // 如果購物車數據為空，直接返回
      if (cart.length === 0) {
        notification_method.info("購物車為空，無需同步");
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
