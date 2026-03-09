const db = require("../utils/database.js");

const { pool } = require("../utils/database.js");
const Cart = require("./cart.js");

module.exports = class Product {
  // Object
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = Number(price);
  }

  // Save Object to database
  save() {
    return db.execute(
      "INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)",
      [this.title, this.price, this.imageUrl, this.description],
    );
  }

  // Get all Project from database
  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  // Find Product from database
  static findById(id, callback) {}

  // Delete Product from database
  static deleteProductById(id) {}
};
