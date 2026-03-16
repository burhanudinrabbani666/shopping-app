const { getDB } = require("../utils/database");

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    const db = getDB();

    return db
      .collection("products")
      .insertOne(this)
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
        console.log(products);

        return products;
      })
      .catch((error) => console.log(error));
  }
}

// const Product = sequelize.define("product", {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true, // This can use findByPk
//   },
//   title: DataTypes.STRING,
//   price: { type: DataTypes.DOUBLE, allowNull: false },
//   imageUrl: { type: DataTypes.STRING, allowNull: false },
//   description: { type: DataTypes.STRING, allowNull: false },
//   createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
//   updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
// });

module.exports = Product;
