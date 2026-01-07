const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product._fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Products - Shop",
      path: "/products",
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Cart - Shop",
    path: "/cart",
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your orders - Shop",
    path: "/orders",
  });
};

exports.getIndex = (req, res, next) => {
  Product._fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCheckOut = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout - Shop",
    path: "/checkout",
  });
};
