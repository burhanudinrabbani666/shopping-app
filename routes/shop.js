const express = require("express");
const router = express.Router();
const path = require("path");
const {
  getProducts,
  getCart,
  getIndex,
  getCheckOut,
  getOrders,
  getProduct,
  postCart,
  postCartDeleteProduct,
} = require("../controllers/shop");

//-----------------------------------//
//          Get Methode              //
//-----------------------------------//

router.get("/", getIndex);

router.get("/products", getProducts);

router.get("/products/:productId", getProduct);

router.get("/cart", getCart);

router.post("/cart", postCart);

router.get("/checkout", getCheckOut);

router.get("/orders", getOrders);

//-----------------------------------//
//          Post Methode             //
//-----------------------------------//

router.post("/cart-delete-item", postCartDeleteProduct);

module.exports = router;
