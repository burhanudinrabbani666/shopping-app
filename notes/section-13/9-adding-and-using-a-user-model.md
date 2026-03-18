# Adding and using a user model

`/models/user.js`

```js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  cart: {
    items: [
      {
        productId: { type: Schema.Types.ObjectId, required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

module.exports = mongoose.model("user", userSchema);
```

`app.js`

```js
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    User.findOne().then((user) => {
      console.log(user);

      if (!user) {
        const user = new User({
          name: "bani",
          email: "bani@example.io",
          cart: { items: [] },
        });

        user.save();
      }
    });

    app.listen(3001);
  })
  .catch((error) => console.log(error));
```

```js
app.use((req, _, next) => {
  return User.findById("69ba49bdb77dc36c2e333501")
    .then((user) => {
      req.user = user;

      next();
    })
    .catch((error) => console.log(error));
});
```

Next: [Using relations in Mongoose](./10-using-relations-in-mongoose.md)
