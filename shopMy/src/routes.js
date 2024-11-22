import Login_page from "./pages/Login_page.vue";
import Home_page from "./pages/Home_page.vue";
import Profile_page from "./pages/Profile_page.vue";
import Profile_editting_page from "./pages/Profile_editting_page.vue";
import Search_page from "./pages/Search_page.vue";
import Product_Info_page from "./pages/Product_Info_page.vue";
import cart_page from "./pages/Cart_page.vue";
import Concept_page from "./pages/Concept_page.vue";
import Product_page from "./pages/Product_page.vue";
import Payment_page from "./pages/Payment_page.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home_page,
  },
  {
    path: "/login",
    name: "login",
    component: Login_page,
  },
  {
    path: "/search",
    name: "search",
    component: Search_page,
  },
  {
    path: "/productInfo",
    name: "productInfo",
    component: Product_Info_page,
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
  },
  {
    path: "/profileEditting",
    name: "profileEditting",
    component: Profile_editting_page,
  },
  {
    path: "/Concept",
    name: "Concept",
    component: Concept_page,
  },
  {
    path: "/Product",
    name: "Product",
    component: Product_page,
  },
  {
    path: "/Payment",
    name: "Payment",
    component: Payment_page,
  },
];

const router = createRouter({
  routes: routes,
  history: createWebHistory(),
});

export { router };
