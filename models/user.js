const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/database");

class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }

  save() {
    const db = getDB();

    return db
      .collection("users")
      .insertOne(this)
      .then(() => console.log("Success Creted User!"))
      .catch((error) => console.log(error));
  }

  static findUserById(id) {
    const db = getDB();

    return db
      .collection("users")
      .find({ _id: new ObjectId(id) })
      .then((user) => {
        return user;
      })
      .catch((error) => console.log(error));
  }
}

module.exports = User;
