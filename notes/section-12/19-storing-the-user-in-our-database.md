# Storing the user in our database

```js
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new ObjectId(id) : null;
    this.userId = userId; // <=========== Adding userId
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
```

Next: [Working on cart items and orders](./20-working-on-cart-items-and-orders.md)
