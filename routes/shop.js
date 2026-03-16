const express = require("express");
const router = express.Router();
const {
  getProducts,
  getIndex,
  // getCart,
  // getCheckOut,
  // getOrders,
  getProduct,
  // postCart,
  postCartDeleteProduct,
  postOrder,
} = require("../controllers/shop");

//-----------------------------------//
//          Get Methode              //
//-----------------------------------//

router.get("/", getIndex);

router.get("/products", getProducts);

router.get("/products/:productId", getProduct);

// router.get("/cart", getCart);

// router.post("/cart", postCart);

// router.get("/checkout", getCheckOut);

// router.get("/orders", getOrders);

//-----------------------------------//
//          Post Methode             //
//-----------------------------------//

router.post("/cart-delete-item", postCartDeleteProduct);

router.post("/create-order", postOrder);

module.exports = router;
