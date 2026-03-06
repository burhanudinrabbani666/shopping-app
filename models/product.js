const fs = require("fs");
const path = require("path");

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
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  _save() {
    getProductFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id,
        );

        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;

        fs.writeFile(pathFile, JSON.stringify(updatedProducts), (error) => {
          console.log(error);
        });
      } else {
        //
        this.id = Math.trunc(Math.random().toString());
        products.push(this);
        fs.writeFile(pathFile, JSON.stringify(products), (error) => {
          console.log(error);
        });
      }
    });
  }

  static _fetchAll(callBack) {
    getProductFromFile(callBack);
  }

  static findById(id, callback) {
    getProductFromFile((products) => {
      const product = products.find((product) => product.id === id);

      callback(product);
    });
  }
};
