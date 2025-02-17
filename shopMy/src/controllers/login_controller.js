import { reactive, ref } from "vue";
import {
  use_navbar_store,
  use_auth_store,
  use_cart_store,
} from "../stores/index"; // 引入 Pinia Store
import { cart_controller } from "../controllers/cart_controller";
import notification from "../controllers/notify_controller"; // 引入通知功能
import axios from "axios";

export default function login_Logic() {
  const formState = reactive({
    username: { value: "", errorMessage: "", hasError: false },
    password: { value: "", errorMessage: "", hasError: false },
    remember: false,
  });

  const isLoading = ref(false); // 新增 isLoading 狀態

  async function validate_form() {
    let isValid = true;

    // 驗證帳號格式
    if (formState.username.value.length < 8) {
      formState.username.errorMessage = "帳號和密碼不符";
      formState.username.hasError = true;
      isValid = false;
    } else {
      formState.username.errorMessage = "";
      formState.username.hasError = false;
    }

    // 驗證密碼格式
    if (formState.password.value.length < 6) {
      formState.password.errorMessage = "帳號和密碼不符";
      formState.password.hasError = true;
      isValid = false;
    } else {
      formState.password.errorMessage = "";
      formState.password.hasError = false;
    }

    return isValid;
  }

  async function login() {
    if (await validate_form()) {
      isLoading.value = true; // 請求開始，設定為加載中
      try {
        const payload = {
          user_name: formState.username.value,
          password: formState.password.value,
        };

        const response = await axios.post("/api/auth/login", payload);

        const { token } = response.data; // 從 API 響應中提取 token 和 user

        if (formState.remember) {
          localStorage.setItem("shopMy_token_local", response.data.token);
        } else {
          sessionStorage.setItem("shopMy_token_session", response.data.token);
        }
        // 登入成功後關閉登入容器
        const navbar_store = use_navbar_store();
        navbar_store.close_all();

        // 更新狀態
        const auth_store = use_auth_store(); // 獲取 Store 實例
        auth_store.setLoginState(token); // 使用 Store 實例調用方法

        // 同步購物車
        const cart_store = use_cart_store();
        await cart_store.init_cart();
        await cart_controller.fetch_cart_items();
        // 顯示成功通知
        notification.success(`歡迎，${formState.username.value.trim()}!`);

        // 檢查 localStorage 內是否有購物車資訊
        setTimeout(async () => {
          const cart = JSON.parse(localStorage.getItem("cart") || "[]");
          if (cart.length > 0) {
            const asking_user = confirm(
              "發現離線添加的購物車，是否同步至帳號？"
            );
            if (asking_user) {
              try {
                await cart_controller.sync_cart_items_to_user();
                await cart_store.init_cart();
                await cart_controller.fetch_cart_items();
              } catch (error) {
                console.error("購物車同步過程中出現錯誤:", error);
                notification.error("購物車同步過程中出現錯誤，請稍後再試！");
              }
            }
          }
        }, 1500);
      } catch (error) {
        console.error("登入失敗:", error);
      }
    } else {
      console.log("登入失敗");
    }
    isLoading.value = false; // 請求結束
  }

  async function logout() {
    const authStore = use_auth_store();
    try {
      // 清除本地存儲的 token
      localStorage.removeItem("shopMy_token_local");
      sessionStorage.removeItem("shopMy_token_session");

      // 清除 Pinia 的狀態
      authStore.clearLoginState();
      location.reload();
      notification.success(`登出成功!`);
      setTimeout(() => {
        location.reload();
      }, 1500);
    } catch (error) {
      console.error("登出失敗", error);
    }
  }

  return {
    formState,
    isLoading,
    login,
    logout,
  };
}

// 使用token來驗證是否已登入
export const verify_token = () => {
  const auth_store = use_auth_store();

  if (!auth_store.token) {
    console.log("沒有token 你只能在外面看");
    return { isValid: false };
  }

  // 若有 Token，直接判定通過
  console.log("你有token 進去吧");
  return { isValid: true };
};
