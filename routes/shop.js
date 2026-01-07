const express = require("express");
const router = express.Router();
const path = require("path");
const {
  getProducts,
  getCart,
  getIndex,
  getCheckOut,
} = require("../controllers/shop");

router.get("/", getIndex);
router.get("/products", getProducts);
router.get("/cart", getCart);
router.get("/checkout", getCheckOut);

module.exports = router;
