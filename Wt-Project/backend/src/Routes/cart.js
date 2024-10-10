const express = require("express");
const router = express.Router();

const { addToCart, userCart, removeFromCart } = require("../Controller/cart");

router.get("/userCart/:id", userCart);
router.post("/addToCart", addToCart);
router.post("/removeFromCart", removeFromCart);

module.exports = router;
