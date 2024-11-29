const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// 獲取所有商品
router.get("/getAllProducts", productController.getAllProducts);

router.get("/getProductsByCategory", productController.getProductsByCategory);

module.exports = router;
