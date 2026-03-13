const Product = require("../models/product");
const Cart = require("../models/cart");

//-----------------------------------//
//           Get Methode             //
//-----------------------------------//

exports.getProducts = (req, res) => {
  Product.findAll()
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
  Product.findByPk(productId) // Find product with primary key => id
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
    .then((cart) => {
      /*
        dataValues: {
          id: 1,
          createdAt: 2026-03-13T04:22:19.965Z,
          updatedAt: 2026-03-13T04:22:19.965Z,
          userId: 1
        },
      */

      return cart
        .getProducts()
        .then((products) => {
          console.log(products, "Products");

          res.render("shop/cart", {
            pageTitle: "Cart - Shop",
            path: "/cart",
            products,
          });
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

exports.getOrders = (req, res) => {
  res.render("shop/orders", {
    pageTitle: "Your orders - Shop",
    path: "/orders",
  });
};

exports.getIndex = (req, res) => {
  Product.findAll()
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
  let fetchedCart;

  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;

      console.log("------------------------ Cart \n", cart);

      return cart.getProducts({ where: { id } });
    })
    .then((products) => {
      let product;

      console.log("------------------------ Product \n", products);

      if (products.length > 0) {
        product = products[0];
      }

      let newQuantity = 1;

      if (product) {
        // .... later
      }

      return Product.findByPk(id)
        .then((product) => {
          return fetchedCart.addProduct(product, {
            through: { quantity: newQuantity },
          }); // Magic method for many to many
        })
        .catch((error) => console.log(error));
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((error) => console.log(error));
};

exports.postCartDeleteProduct = (req, res) => {
  const id = req.body.productId;
  Product.findById(id, (product) => {
    Cart.deleteProductById(id, product.price);

    res.redirect("/cart");
  });
};
