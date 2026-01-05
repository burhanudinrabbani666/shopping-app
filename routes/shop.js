const express = require("express");
const router = express.Router();
const path = require("path");
const rootDir = require("../utils/path");

const adminData = require("./admin");

router.get("/", (req, res, next) => {
  const products = adminData.products;

  res.render("shop", {
    prods: products,
    pageTitle: "🛒 shop",
    path: "/",
    hasProduct: products.length > 0,
    activeShop: true,
    productsCSS: true,
  });
});

module.exports = router;
