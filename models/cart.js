const fs = require("fs");
const path = require("path");

const pathFile = path.join(
  path.dirname(require.main.filename),
  "data",
  "cart.json",
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // fetch the provious cart
    fs.readFile(pathFile, (error, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!error) {
        cart = JSON.parse(fileContent);
      }
      // check the cart => find existing product
      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === id,
      );
      const existingProduct = cart.products[existingProductIndex];

      let updateProduct;

      if (existingProduct) {
        updateProduct = { ...existingProduct };
        updateProduct.quantity = updateProduct.quantity + 1;

        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updateProduct;
      } else {
        updateProduct = { id, quantity: 1 };
        cart.products = [...cart.products, updateProduct];
      }

      cart.totalPrice = cart.totalPrice + Number(productPrice);
      fs.writeFile(pathFile, JSON.stringify(cart), (error) => {
        console.log(error);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(pathFile, (error, fileContent) => {
      if (error) {
        console.log(error);
        return;
      }

      const updateCart = { ...fileContent };
      const product = updateCart.producs.find((prod) => prod.id === id);
      const productQty = product.quantity;

      updateCart.products = updateCart.products.filter(
        (prod) => prod.id === id,
      );
      updateCart.totalPrice =
        updateCart.productPrice - productPrice * productQty;
    });

    fs.writeFile(pathFile, JSON.stringify(updateCart), (error) => {
      console.log(error);
    });
  }
};
