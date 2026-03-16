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
  req.user
    .getOrders({ include: ["products"] })
    .then((orders) => {
      console.log(orders);

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
  let fetchedCart;
  let newQuantity = 1;

  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;

      return cart.getProducts({ where: { id } });
    })
    .then((products) => {
      let product;

      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cart_items.quantity; // cart_items table
        newQuantity = oldQuantity + 1;

        return product;
      }

      return Product.findByPk(id);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => res.redirect("/cart"))
    .catch((error) => console.log(error));
};

exports.postCartDeleteProduct = (req, res) => {
  const id = req.body.productId;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id } });
    })
    .then((products) => {
      const product = products[0];
      return product.cart_items.destroy();
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((error) => console.log(error));
};

exports.postOrder = (req, res) => {
  let fetchCart;

  req.user
    .getCart()
    .then((cart) => {
      fetchCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return req.user
        .createOrder()
        .then((order) => {
          order.addProducts(
            products.map((product) => {
              product.order_items = { quantity: product.cart_items.quantity };

              return product;
            }),
          );
        })
        .then(() => {
          return fetchCart.setProducts(null); // Clean Products in Cart
        })
        .then(() => {
          res.redirect("/orders");
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};
