import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { router } from "./routes";
import "../src/assets/base.scss";
import { use_auth_store, use_cart_store } from "./stores/index";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

// 應用啟動時恢復狀態
const auth_store = use_auth_store();
auth_store.initializeAuthState();

const cart_store = use_cart_store();
cart_store.init_cart;

app.mount("#app");
