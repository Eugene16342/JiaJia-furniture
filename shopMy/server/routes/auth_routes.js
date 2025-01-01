const express = require("express");
const router = express.Router();
const auth_controller = require("../controllers/auth_controller");

// 驗證碼生成
router.get("/generate_captcha", auth_controller.generate_captcha);

// 驗證驗證碼
router.post("/check_captcha", auth_controller.check_captcha);

// 檢查帳號是否已註冊
router.get("/check_isRepeat", auth_controller.check_isRepeat);

// 註冊路由
router.post("/register", auth_controller.register);

// 登入路由
router.post("/login", auth_controller.login);

module.exports = router;
