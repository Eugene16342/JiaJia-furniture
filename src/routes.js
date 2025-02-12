import Home_page from "./pages/Home_page.vue";
import Profile_page from "./pages/Profile_page.vue";
import Search_page from "./pages/Search_page.vue";
import cart_page from "./pages/Cart_page.vue";
import concept_page from "./pages/concept_page.vue";
import Product_page from "./pages/Product_page.vue";
import Payment_page from "./pages/Payment_page.vue";
import { createRouter, createWebHistory } from "vue-router";

import { verify_token } from "./controllers/login_controller";
import { use_navbar_store } from "./stores/index";

import notification_method from "./controllers/notify_controller";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home_page,
  },

  {
    path: "/search",
    name: "search",
    component: Search_page,
    meta: { stay: true },
  },
  {
    path: "/cart",
    name: "cart",
    component: cart_page,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile_page,
    meta: { requiresAuth: true },
  },

  {
    path: "/concept",
    name: "concept",
    component: concept_page,
  },
  {
    path: "/product/:id/:name?",
    name: "Product",
    component: Product_page,
  },
  {
    path: "/Payment",
    name: "Payment",
    component: Payment_page,
    meta: { requiresAuth: true },
  },
  {
    // 所有未定義路徑
    path: "/:catchAll(.*)",
    name: "not_found",
    component: Home_page,
  },
];

// 恢復滾動條位置
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior(to, from, saved_position) {
    if (saved_position) {
      // 如果有保存的位置 返回保存的位置
      return saved_position;
    }

    // 有 stay 狀態就停在 saved_position
    if (to.meta.stay) {
      return;
    }

    // 預設滾動到頁面頂部
    return { top: 0 };
  },
});

// 透過 token 來檢查是否登入
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const result = await verify_token();

    if (!result.isValid) {
      const navbar_store = use_navbar_store();
      navbar_store.toggle_login_container();
      notification_method.not_login();

      next({ name: "home" });
      return;
    }
  }
  next();
});

// 如果沒有導航失敗 關閉導覽列所有漢堡表單
router.afterEach((to, from, failure) => {
  const navbar_store = use_navbar_store();

  if (!failure) {
    navbar_store.close_all();
  }
});

export { router };
