const express = require("express");
const router = express.Router();
const path = require("path");
const rootDir = require("../utils/path");

const adminData = require("./admin");

router.get("/", (req, res, next) => {
  console.log("add-product", adminData.products);
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;
