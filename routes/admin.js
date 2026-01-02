const express = require("express");
const router = express.Router();
const path = require("path");
const rootDir = require("../utils/path");

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

// /admin/product => POST
router.post("/product", (req, res, next) => {
  // Extracting data input
  console.log(req.body);

  res.redirect("/");
});

module.exports = router;
