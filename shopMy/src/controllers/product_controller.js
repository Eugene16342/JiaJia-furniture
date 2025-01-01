import {
  use_product_store,
  use_cart_store,
  use_auth_store,
} from "../stores/index";
import notification_method from "./notify_controller";
import axios from "axios";

const min = 1;
const max = 10;

export const product_controller = {
  // 檢查數量
  limit_quantity(value) {
    if (value < min) {
      console.log("不能再少");
    } else if (value > max) {
      notification_method.too_many();
      console.log("不能再多");
      return max;
    } else {
      return value;
    }
  },

  // 離開 input 自動補到1
  blur_to_min(value) {
    if (value === undefined || value === NaN) {
      console.log("不能為空");
      return min;
    } else {
      return value;
    }
  },

  // 禁止輸入小數點 加減 和 e
  prevent_key_down(event) {
    if (
      event.key === "." ||
      event.key === "e" ||
      event.key === "+" ||
      event.key === "-"
    ) {
      event.preventDefault();
      console.log("禁止輸入小數點加減和 e !");
    }
  },

  // 放入購物車
  async add_to_cart(product_id, selectedColor, quantity) {
    const product_store = use_product_store();
    const auth_store = use_auth_store();
    const colors = product_store.product.colors;

    const colorName =
      colors.find((color) => color.color_id === selectedColor?.color_id)
        ?.name || "無顏色";

    // 顏色未選
    if (colors.length > 0 && !selectedColor) {
      console.log("未選擇顏色");
      notification_method.info("請選擇一種顏色!");
      return;
    }
    // 數量未填
    if (!quantity) {
      notification_method.info("請輸入購買數量!");
      return;
    }

    // 要加入購物車的商品資訊
    const cart_item = {
      product_id,
      color_id: selectedColor?.color_id || null,
      quantity,
    };

    // 登入發送請求
    try {
      let result;
      if (auth_store.isAuthenticated) {
        // 登入發送請求
        result = await this.login_add_to_cart(cart_item);
      } else {
        // 沒登入記錄在 localStorage
        result = this.local_add_to_cart(cart_item);
      }

      // 根據成功或超量顯示對應的通知
      if (result === "success") {
        console.log(
          `商品id : ${product_id} 
  ${product_store.product.name}
  顏色id : ${colors.length > 0 ? selectedColor.color_id : null}
  顏色: ${colorName}
  數量 : ${quantity}`
        );
        notification_method.success(
          ` 「${product_store.product.name}」${
            colors.length > 0 ? colorName : ""
          }，數量${quantity}，已加入購物車`
        );
      } else if (result === "exceed") {
        notification_method.info(`商品數量已增加至${max}件！`);
        notification_method.too_many();
      }
    } catch (error) {
      console.error("加入購物車失敗:", error);
      notification_method.error("加入購物車時發生錯誤！");
    }
  },

  local_add_to_cart(cart_item) {
    const cart_store = use_cart_store();
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // 檢查是否已存在同一商品
    const existing_item = cart.findIndex((item) => {
      if (cart_item.color_id === null) {
        return item.product_id === cart_item.product_id; // 沒有顏色時只比對商品ID
      }
      return (
        item.product_id === cart_item.product_id &&
        item.color_id === cart_item.color_id // 有顏色時比對商品ID和顏色ID
      );
    });

    if (existing_item !== -1) {
      // 如果商品已存在，計算新的總數量
      const newQuantity = cart[existing_item].quantity + cart_item.quantity;

      // 如果超過上限，設置為最大值
      if (newQuantity > max) {
        cart[existing_item].quantity = max;
        localStorage.setItem("cart", JSON.stringify(cart));
        // 同步到 cart_store 的 cart_items
        cart_store.setCart(cart);
        return "exceed";
      } else {
        // 如果未超過上限，更新數量
        cart[existing_item].quantity = newQuantity;
      }
    } else {
      // 如果商品不存在，直接加入購物車
      cart.push(cart_item);
    }

    // 將購物車數據保存回 localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // 同步到 cart_store 的 cart_items
    cart_store.setCart(cart);
    return "success";
  },

  async login_add_to_cart(cart_item) {
    const auth_store = use_auth_store();
    const cart_store = use_cart_store();

    try {
      const response = await axios.post(
        "/api/cart/insert_item",
        {
          product_id: cart_item.product_id,
          color_id: cart_item.color_id,
          quantity: cart_item.quantity,
        },
        {
          headers: { Authorization: `Bearer ${auth_store.token}` },
        }
      );

      // 數量太多返回超量
      if (response.data.status === "limit") {
        cart_store.init_cart();
        return "exceed";
      }
      // 反之正常
      cart_store.init_cart();
      return "success";
    } catch (error) {
      console.error("新增購物車項目至資料庫失敗", error);
      notification_method.error("無法同步購物車數據！");
    }
  },
};
