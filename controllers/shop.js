const Product = require("../models/product");

//-----------------------------------//
//           Get Methode             //
//-----------------------------------//

exports.getProducts = (req, res) => {
  Product.fetchALl()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Products - Shop",
        path: "/products",
      });
    })
    .catch((error) => console.log(error));
};

exports.getProduct = (req, res) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: `Shop - ${product.title}`,
        path: "/products",
      });
    })
    .catch((error) => console.log(error));
};

exports.getCart = (req, res) => {
  req.user
    .getCart()
    .then((products) => {
      res.render("shop/cart", {
        pageTitle: "Cart - Shop",
        path: "/cart",
        products,
      });
    })
    .catch((error) => console.log(error));
};

exports.getOrders = (req, res) => {
  req.user
    .getOrders()
    .then((orders) => {
      res.render("shop/orders", {
        pageTitle: "Your orders - Shop",
        path: "/orders",
        orders,
      });
    })
    .catch((error) => console.log(error));
};

exports.getIndex = (_, res) => {
  Product.fetchALl()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Products - Shop",
        path: "/",
      });
    })
    .catch((error) => console.log(error));
};

exports.getCheckOut = (req, res) => {
  res.render("shop/index", {
    pageTitle: "Checkout - Shop",
    path: "/checkout",
  });
};

//-----------------------------------//
//          Post Methode             //
//-----------------------------------//

exports.postCart = (req, res) => {
  const id = req.body.productId;
  Product.findById(id)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then(() => res.redirect("/cart"))
    .catch((error) => console.log(error));
};

exports.postCartDeleteProduct = (req, res) => {
  const id = req.body.productId;

  req.user
    .deleteItemsFromCart(id)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((error) => console.log(error));
};

exports.postOrder = (req, res) => {
  req.user
    .addOrder()
    .then(() => {
      res.redirect("/orders");
    })
    .catch((error) => console.log(error));
};
