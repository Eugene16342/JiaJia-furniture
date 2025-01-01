const express = require("express");
const router = express.Router();
const product_controller = require("../controllers/product_controller");

// 獲取所有商品
router.get("/getAllProducts", product_controller.getAllProducts);

router.get("/get_product_by_id/:id", product_controller.get_product_by_id);

router.get(
  "/getRecommedProduct/:categoryId",
  product_controller.getRecommedProduct
);

module.exports = router;
