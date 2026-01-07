const { deepStrictEqual } = require("assert");
const fs = require("fs");
const path = require("path");

const pathFile = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
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
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  _save() {
    this.id = Math.random().toString();

    getProductFromFile((products) => {
      products.push(this);
      fs.writeFile(pathFile, JSON.stringify(products), (error) => {
        console.log(error);
      });
    });
  }

  static _fetchAll(callBack) {
    getProductFromFile(callBack);
  }
};
