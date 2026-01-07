const products = [];

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  _save() {
    products.push(this);
  }

  static _fetchAll() {
    return products;
  }
};
