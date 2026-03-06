const Product = require("../models/product");

// Admin
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add product - Shop",
    path: "/admin/add-product",
    formCss: true,
    productsCss: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(title, imageUrl, description, price);
  product._save();

  res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) {
    res.redirect("/");
  }

  res.render("admin/edit-product", {
    pageTitle: "Edit product - Shop",
    path: "/admin/edit-product",
    editing: editMode,
  });
};

exports.getProduct = (req, res, next) => {
  Product._fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Product- Shop",
      path: "/admin/products",
    });
  });
};
