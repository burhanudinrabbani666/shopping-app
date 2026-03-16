const express = require("express");
const router = express.Router();
const {
  getAddProduct,
  postAddProduct,
  // getEditProduct,
  // postEditProduct,
  // postDeleteProduct,
  // getProducts,
} = require("../controllers/admin");

router.post("/add-product", postAddProduct);
router.get("/add-product", getAddProduct);

// // /admin => GET
// router.get("/products", getProducts);
// router.get("/edit-product/:productId", getEditProduct);

// // /admin => POST
// router.post("/edit-product", postEditProduct);
// router.post("/delete-product", postDeleteProduct);

module.exports = router;
