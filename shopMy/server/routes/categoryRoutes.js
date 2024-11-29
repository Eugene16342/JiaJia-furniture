const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// 獲取所有分類
router.get("/getAllCategories", categoryController.getAllCategories);

module.exports = router;
