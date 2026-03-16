# Fetching a single product

First we need Change ObjectId to ObjectId(id).toString() when we fetch data in the first time Or when we're fetch all Data

```js
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
```

Next: [Making the edit and delete buttons work again](./12-making-the-edit-and-delete-buttons-work-again.md)
