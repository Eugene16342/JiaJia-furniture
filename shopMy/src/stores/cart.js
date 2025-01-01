import { defineStore } from "pinia";
import notification_method from "../controllers/notify_controller";
import { use_auth_store } from "./index";
import axios from "axios";

export const use_cart_store = defineStore("cart", {
  state: () => ({
    cart_items: [],
    selected_items: [], // 被勾選的商品
  }),
  actions: {
    // 初始化購物車 沒登入從 localStorage 找資料 登入請求資料
    async init_cart() {
      const auth_store = use_auth_store();

      if (auth_store.isAuthenticated) {
        // 如果已登入，從伺服器獲取資料庫的購物車數據
        try {
          const response = await axios.get("/api/cart/get_user_cart", {
            headers: {
              Authorization: `Bearer ${auth_store.token}`,
            },
          });

          this.setCart(response.data); // 更新狀態
        } catch (error) {
          console.error("從伺服器獲取購物車失敗:", error);
          notification_method.error("無法載入購物車資訊！");
        }
      } else {
        // 如果未登入，從 localStorage 獲取購物車數據
        const local_cart = JSON.parse(localStorage.getItem("cart")) || [];
        this.setCart(local_cart);
      }
    },

    // 同步資料到狀態
    setCart(cart) {
      this.cart_items = cart;
      this.sync_local(); // 每次更新狀態後同步到 localStorage
      console.log("我是setCart", this.cart_items);
    },

    // 同步到 localStorage
    sync_local() {
      const auth_store = use_auth_store();

      if (auth_store.isAuthenticated) {
        return;
      }
      // 過濾出簡化的購物車數據結構
      const simplified_cart_item = this.cart_items.map((item) => ({
        product_id: item.product_id,
        color_id: item.color_id,
        quantity: item.quantity,
      }));
      localStorage.setItem("cart", JSON.stringify(simplified_cart_item));
    },

    // 更新數量
    async update_quantity(productId, colorId, newQuantity) {
      const auth_store = use_auth_store();
      const item = this.cart_items.find(
        (item) => item.product_id === productId && item.color_id === colorId
      );
      if (item) {
        if (item.quantity === 10 && newQuantity >= 10) {
          return;
        }
        item.quantity = newQuantity;

        if (auth_store.isAuthenticated) {
          try {
            await axios.put(
              "/api/cart/update_item",
              {
                product_id: productId,
                color_id: colorId,
                quantity: newQuantity,
              },
              {
                headers: { Authorization: `Bearer ${auth_store.token}` },
              }
            );
          } catch (error) {
            console.error("更新購物車數量失敗", error);
            notification_method.error("更新商品數量時發生錯誤!");
          }
        }
        this.sync_local(); // 更新數量後同步到 localStorage
      }
    },
    // 切換商品的勾選狀態
    toggleSelectItem(productId, colorId) {
      const index = this.selected_items.findIndex(
        (item) => item.product_id === productId && item.color_id === colorId
      );
      if (index === -1) {
        const item = this.cart_items.find(
          (item) => item.product_id === productId && item.color_id === colorId
        );
        if (item) {
          this.selected_items.push(item); // 如果未選中，加入勾選列表
        }
      } else {
        this.selected_items.splice(index, 1); // 如果已選中，取消勾選
      }
    },

    // 全選/取消全選
    select_all(isSelected) {
      if (isSelected) {
        this.cart_items.forEach((item) => {
          item.selected = true; // 全選時設置每個商品的 selected 為 true
        });
        this.selected_items = [...this.cart_items]; // 更新已選列表
      } else {
        this.cart_items.forEach((item) => {
          item.selected = false; // 取消全選時設置每個商品的 selected 為 false
        });
        this.clear_selected();
      }
    },

    // 清空勾選的項目
    clear_selected() {
      this.selected_items = [];
    },

    // 刪除單一項目
    async remove_this_one(productId, colorId) {
      const auth_store = use_auth_store();
      this.cart_items = this.cart_items.filter(
        (item) => item.product_id !== productId || item.color_id !== colorId
      );

      if (auth_store.isAuthenticated) {
        try {
          await axios.delete("/api/cart/remove_item", {
            data: {
              product_id: productId,
              color_id: colorId,
            },
            headers: { Authorization: `Bearer ${auth_store.token}` },
          });
        } catch (error) {
          console.error("無法刪除該商品:", error);
          notification_method.error("刪除商品時出現錯誤!");
        }
      }
      this.sync_local(); // 同步更新到 localStorage
    },

    // 刪除勾選的項目
    async remove_selected() {
      if (this.selected_items.length > 0) {
        const auth_store = use_auth_store();
        if (auth_store.isAuthenticated) {
          try {
            // 發送 API 請求刪除多個商品

            await axios.delete("/api/cart/remove_items", {
              data: this.selected_items.map((item) => ({
                product_id: item.product_id,
                color_id: item.color_id,
              })),
              headers: { Authorization: `Bearer ${auth_store.token}` },
            });
            console.log(this.selected_items);
          } catch (error) {
            console.error("同步刪除多個商品失敗:", error);
            notification_method.error("無法刪除勾選的商品！");
            return;
          }
        }

        // 本地移除勾選項目
        this.cart_items = this.cart_items.filter(
          (item) =>
            !this.selected_items.some(
              (selected) =>
                selected.product_id === item.product_id &&
                selected.color_id === item.color_id
            )
        );
        this.selected_items = []; // 清空選擇
        this.sync_local(); // 同步更新到 localStorage
      } else {
        notification_method.info("請勾選欲刪除的項目!");
      }
    },
  },
  getters: {
    // 計算勾選數量
    select_total_items(state) {
      return state.selected_items.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    // 計算總價
    total_price(state) {
      return state.selected_items.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
    },

    // 計算總數量 給 nav_bar 展示
    total_items(state) {
      return state.cart_items.reduce((total, item) => total + item.quantity, 0);
    },
  },
});
