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

exports.getCart = () => {
  // Cart.getAllProducts((cart) => {
  // Product._fetchAll((products) => {
  //   const cartProducts = [];
  //   for (let product of products) {
  //     const cartProductsData = cart.products.find(
  //       (prod) => prod.id === product.id,
  //     );
  //     if (cartProductsData) {
  //       cartProducts.push({
  //         productData: product,
  //         qty: cartProductsData.quantity,
  //       });
  //     }
  //   }
  //   res.render("shop/cart", {
  //     pageTitle: "Cart - Shop",
  //     path: "/cart",
  //     products: cartProducts,
  //   });
  // });
  // });
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
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price);
  });

  res.redirect("/cart");
};

exports.postCartDeleteProduct = (req, res) => {
  const id = req.body.productId;
  Product.findById(id, (product) => {
    Cart.deleteProductById(id, product.price);

    res.redirect("/cart");
  });
};
