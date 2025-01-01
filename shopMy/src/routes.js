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
    // meta: { requiresAuth: true },
  },
  {
    // 所有未定義路徑
    path: "/:catchAll(.*)",
    name: "not_found",
    component: Home_page,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

// 透過token來檢查是否登入
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const result = await verify_token(); // 同步驗證 token

    if (!result.isValid) {
      notification_method.not_login();

      const navbar_store = use_navbar_store();
      navbar_store.toggle_login_container(); // 執行登出後的操作
      return next({ name: "home" }); // 確保只執行一次 next()
    }
  }
  next(); // 如果驗證通過，繼續導航
});

router.afterEach(() => {
  const navbar_store = use_navbar_store();
  navbar_store.close_all();
});

export { router };
