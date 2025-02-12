const express = require("express");
const router = express.Router();
const category_controller = require("../controllers/category_controller");

// 獲取所有分類
router.get("/get_all_categories", category_controller.get_all_categories);

module.exports = router;
