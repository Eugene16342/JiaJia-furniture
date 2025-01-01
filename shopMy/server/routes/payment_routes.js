const express = require("express");
const { authenticate_token } = require("../middleware/authenticate_token");
const payment_controller = require("../controllers/payment_controller");

const router = express.Router();

router.post(
  "/computed_total_price",
  authenticate_token,
  payment_controller.computed_total_price
);

router.post(
  "/order_confirm",
  authenticate_token,
  payment_controller.order_confirm
);

module.exports = router;
