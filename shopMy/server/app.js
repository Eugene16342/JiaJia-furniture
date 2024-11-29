const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const db = require("./models");

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

// 設定 API 路由，確保在代理中間件之前
app.use("/api/product", productRoutes); // 產品相關的路由
app.use("/api/categorie", categoryRoutes); // 分類相關的路由

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
