# Connecting to the Mongodb server with Mongoose

```js
const mongoose = require("mongoose");

// Connecting to mongoose
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("Connected");

    app.listen(3001);
  })
  .catch((error) => console.log(error));
```

Next: [Creating the product schema](./3-creating-the-product-schema.md)
