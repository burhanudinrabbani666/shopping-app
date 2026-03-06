const express = require("express");
const router = express.Router();
const path = require("path");
const {
  getAddProduct,
  postAddProduct,
  getProduct,
  getEditProduct,
  postEditProduct,
} = require("../controllers/admin");

// /admin => GET
router.get("/add-product", getAddProduct);
router.get("/products", getProduct);
router.get("/edit-product/:productId", getEditProduct);

// /admin => POST
router.post("/add-product", postAddProduct);
router.post("/edit-product", postEditProduct);

module.exports = router;
