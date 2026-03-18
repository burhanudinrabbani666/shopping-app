# Creating the product Schema

```js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, require: true },
  price: { type: Number, require: true },
  description: { type: String, require: true },
  imageUrl: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
```

Next: [Saving data through Mongoose](./4-saving-data-through-mongoose.md)
