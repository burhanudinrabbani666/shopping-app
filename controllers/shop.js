const Product = require("../models/product");
const Cart = require("../models/cart");

//-----------------------------------//
//           Get Methode             //
//-----------------------------------//

exports.getProducts = (req, res, next) => {
  Product._fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Products - Shop",
      path: "/products",
    });
  });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId, (product) => {
    res.render("shop/product-detail", {
      product,
      pageTitle: `Shop - ${product.title}`,
      path: `/products`, // to highlight the nav
    });
  });
};

exports.getCart = (req, res, next) => {
  /*
  {
    "products":[
      {
        "id": string,
        "quantity": number
      }
    ],
    "totalPrice": number
  }  
  */

  Cart.getAllProducts((cart) => {
    Product._fetchAll((products) => {
      const cartProducts = [];

      /*
        [
          {
            "id": string,
            "title": string,
            "imageUrl": string
            "description": string,
            "price": number
          }
        ]
      */

      for (let product of products) {
        const cartProductsData = cart.products.find(
          (prod) => prod.id === product.id,
        );

        if (cartProductsData) {
          cartProducts.push({
            productData: product,
            qty: cartProductsData.quantity,
          });
        }
      }

      console.log(cartProducts);

      res.render("shop/cart", {
        pageTitle: "Cart - Shop",
        path: "/cart",
        products: cartProducts,
      });
    });
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

//-----------------------------------//
//          Post Methode             //
//-----------------------------------//

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price);
  });

  res.redirect("/cart");
};

exports.postCartDeleteProduct = (req, res, next) => {
  const id = req.body.productId;
  Product.findById(id, (product) => {
    Cart.deleteProductById(id, product.price);

    res.redirect("/cart");
  });
};
