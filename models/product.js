const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/database");

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new ObjectId(id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDB();
    let dbOp;

    if (this._id) {
      // Update the Product
      dbOp = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this }); // Update value in database

      //
    } else {
      dbOp = db.collection("products").insertOne(this);
    }

    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log(error));
  }

  static fetchALl() {
    const db = getDB();

    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        const newProducts = products.map((product) => {
          const productWithNewID = {
            ...product,
            _id: product._id.toString(),
          };

          return productWithNewID;
        });

        return newProducts;
      })
      .catch((error) => console.log(error));
  }

  static findById(id) {
    const db = getDB();

    return db
      .collection("products")
      .find({ _id: new ObjectId(id) })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((error) => console.log(error));
  }

  static deleteById(id) {
    const db = getDB();

    return db
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) })
      .then(() => {
        console.log("Deleted");
      })
      .catch((error) => console.log(error));
  }
}

module.exports = Product;
