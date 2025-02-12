const express = require("express");
const session = require("express-session"); // 引入 express-session
require("dotenv").config();
const { createProxyMiddleware } = require("http-proxy-middleware");
const product_routes = require("./routes/product_routes");
const category_routes = require("./routes/category_routes");
const auth_routes = require("./routes/auth_routes");
const user_routes = require("./routes/user_routes");
const cart_routes = require("./routes/cart_routes");
const payment_routes = require("./routes/payment_routes");
const db = require("./models");

const jwt_secret = process.env.JWT_SECRET;

const app = express();

// 啟用 JSON 解析中間件
app.use(express.json());

// 測試資料庫連線
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("資料庫連線成功");
  } catch (err) {
    console.error("無法連接資料庫:", err);
    process.exit(1);
  }
})();

//  API 路由
app.use("/api/product", product_routes); // 產品
app.use("/api/categorie", category_routes); // 種類
app.use("/api/auth", auth_routes); // 分類 / 註冊
app.use("/api/user", user_routes); // 獲取使用者資訊
app.use("/api/cart", cart_routes); // 購物車相關
app.use("/api/payment", payment_routes); // 付款

// 代理其他所有請求到 Vite
app.use(
  createProxyMiddleware({
    target: "http://localhost:5173", // 代理目標伺服器
    changeOrigin: true,
    // 過濾條件：只代理不以 "/api" 開頭的請求
    context: (pathname) => !pathname.startsWith("/api"),
  })
);

module.exports = app;
