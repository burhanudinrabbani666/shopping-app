# Using relations in mongoose

```js
const productSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: "user" }, // Reference
});
```

```js
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "products", // Referenci to product table
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});
```

Next: [One important thing about fetching relations](./11-one-important-thing-about-fetching-relations.md)
