const express = require("express");
const router = express.Router();
const product_controller = require("../controllers/product_controller");

// 獲取所有商品
router.get("/get_all_products", product_controller.get_all_products);

router.get("/get_product_by_id/:id", product_controller.get_product_by_id);

module.exports = router;
