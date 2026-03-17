const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/database");

class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart; // {items: []}
    this._id = id;
  }

  save() {
    const db = getDB();

    return db
      .collection("users")
      .insertOne(this)
      .then(() => console.log("Success Creted User!"))
      .catch((error) => console.log(error));
  }

  addToCart(product) {
    const db = getDB();

    const cartProductIndex = this.cart.items.findIndex(
      (cp) => cp.productId.toString() === product._id.toString(),
    );

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    const updatedCart = { items: updatedCartItems };

    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } },
      );
  }

  static findUserById(id) {
    const db = getDB();

    return db
      .collection("users")
      .find({ _id: new ObjectId(id) })
      .next()
      .then((user) => {
        return user;
      })
      .catch((error) => console.log(error));
  }
}

module.exports = User;
