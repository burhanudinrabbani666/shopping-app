const express = require("express");
const router = express.Router();
const path = require("path");
const {
  getAddProduct,
  postAddProduct,
  getProduct,
} = require("../controllers/admin");

// /admin => GET
router.get("/add-product", getAddProduct);
router.get("/products", getProduct);

// /admin => POST
router.post("/add-product", postAddProduct);

module.exports = router;
