const Product = require("../models/product");

// Admin
exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add product - Shop",
    path: "/admin/add-product",
    formCss: true,
    productsCss: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product._save();

  res.redirect("/");
};

exports.getProduct = (req, res, next) => {
  res.render("admin/products", {
    pageTitle: "Products - Shop",
    path: "/admin/products",
  });
};
