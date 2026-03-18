# Updating products

This controller updates an existing product using data submitted from the
edit form. It replaces the fields and redirects back to the home page.

```js
exports.postEditProduct = (req, res) => {
  // Grab the product id and updated fields from the form.
  const id = req.body.productId; // "12nnk12u1k24bk2bkadk2u1"
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  // Update the product document by _id.
  Product.updateOne(
    { _id: id },
    {
      title: updatedTitle,
      price: updatedPrice,
      imageUrl: updatedImageUrl,
      description: updatedDesc,
      // Store a manual timestamp update.
      updatedAt: new Date(),
    },
    // Ensure schema validators run for the update.
    { runValidators: true },
  )
    .then(() => {
      console.log("Updated Products!");
      res.redirect("/");
    })
    .catch((error) => console.log(error));
};
```

## Understanding: `postEditProduct`

1. Read the product ID and new values from the request body.
2. Call `Product.updateOne()` to overwrite the stored fields.
3. Run validators to keep data clean and consistent.
4. Redirect to `/` after a successful update.

## Important Notes

- `updateOne()` does not return the updated document; it returns a result summary.
- Mongoose will cast the `id` string to an ObjectId automatically.
- If your schema uses `timestamps: true`, you can remove the manual `updatedAt`.

## Benefits

- Fast, direct update without loading the full document.
- Validated updates with minimal code.
- Simple controller flow for edit forms.

## Complete Flow

1. User submits the edit form for a product.
2. The controller extracts the new values and product ID.
3. MongoDB updates the product document.
4. The user is redirected back to the home page.

Next: [Deleting products](./8-deleting-products.md)
