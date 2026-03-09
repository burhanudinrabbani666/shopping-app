const fs = require("fs");
const path = require("path");

const Cart = require("./cart.js");

const pathFile = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json",
);

const getProductFromFile = (callBack) => {
  // Async
  fs.readFile(pathFile, (error, fileContent) => {
    if (error) {
      return callBack([]);
    }

    callBack(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  // Object
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = Number(price);
  }

  // Save Object to product.json
  _save() {
    getProductFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id,
        );

        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;

        fs.writeFile(pathFile, JSON.stringify(updatedProducts), (error) => {
          if (error) {
            console.log(error);
          }
        });
      } else {
        //
        this.id = (Math.random() * 999999).toFixed().toString();
        products.push(this);
        fs.writeFile(pathFile, JSON.stringify(products), (error) => {
          if (error) {
            console.log(error);
          }
        });
      }
    });
  }

  // Get all Project from product.json
  static _fetchAll(callBack) {
    getProductFromFile(callBack);
  }

  // Find Product from product.json and return product in callback;
  static findById(id, callback) {
    getProductFromFile((products) => {
      const product = products.find((product) => product.id === id);

      callback(product);
    });
  }

  // Delete Product from product.json and cart.json
  static deleteProductById(id) {
    getProductFromFile((products) => {
      const product = products.find((product) => product.id === id);
      const updatedProducts = products.filter((product) => product.id !== id);

      fs.writeFile(pathFile, JSON.stringify(updatedProducts), (error) => {
        if (!error) {
          Cart.deleteProductById(id, product.price); // Cart Class
        }
      });
    });
  }
};
