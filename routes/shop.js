const express = require("express");
const router = express.Router();
const path = require("path");
const { getProducts } = require("../controllers/products");

router.get("/", getProducts);

module.exports = router;
