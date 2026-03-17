# Creating new Users

create model

```js
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
```

Create Dummby user in mongoDb Atlas

Add User in app.js and storing in body

```js
app.use((req, res, next) => {
  User.findUserById("69b8c1e3b387ed269d055ffd")
    .then((user) => {
      req.user = user;

      next();
    })
    .catch((error) => console.log(error));
});
```

Next: [Storing the user in our database](./19-storing-the-user-in-our-database.md)
