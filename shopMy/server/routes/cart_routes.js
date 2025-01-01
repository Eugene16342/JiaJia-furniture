const express = require("express");
const { authenticate_token } = require("../middleware/authenticate_token");
const cart_controller = require("../controllers/cart_controller");

const router = express.Router();

router.post("/insert_item", authenticate_token, cart_controller.insert_item);

router.post(
  "/sync_cart_items",
  authenticate_token,
  cart_controller.sync_cart_items
);

router.get("/get_user_cart", authenticate_token, cart_controller.get_user_cart);

router.put("/update_item", authenticate_token, cart_controller.update_item);

router.delete("/remove_item", authenticate_token, cart_controller.remove_item);

router.delete(
  "/remove_items",
  authenticate_token,
  cart_controller.remove_items
);

router.post(
  "/get_localstorage_base_info",
  cart_controller.get_localstorage_base_info
);

module.exports = router;
