const express = require("express");
const router = express.Router();
const category_controller = require("../controllers/category_controller");

// 獲取所有分類
router.get("/getAllCategories", category_controller.getAllCategories);

module.exports = router;
