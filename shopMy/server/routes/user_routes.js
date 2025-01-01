const express = require("express");
const { authenticate_token } = require("../middleware/authenticate_token");
const product_controller = require("../controllers/user_controller");

const router = express.Router();

// 獲取使用者資料
router.get("/get_info", authenticate_token, product_controller.get_info);

// 更新使用者資訊
router.put("/update_info", authenticate_token, product_controller.update_info);

// 獲取訂單資料
router.get("/get_orders", authenticate_token, product_controller.get_orders);

module.exports = router;
