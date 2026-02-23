## Rendering Detail

now we connect to our product detail file.

```js
exports.getProduct = (req, res, next) => {
  // Render data
  const prodId = req.params.productId;

  Product.findById(prodId, (product) => {
    res.render("shop/product-detail", {
      // make single data
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  });
};
```

```html
<main class="centered">
  <h1><%= product.title %></h1>
  <hr />
  <div class="">
    <img
      src="<%= product.imageUrl %>"
      alt="<%= product.title %>"
      class="image-detail"
    />
  </div>

  <h2><%= product.price %></h2>
  <p><%= product.description %></p>

  <form action="/cart" method="post">
    <button class="btn" type="submit">Add to cart</button>
  </form>
</main>
```

[Next: Passing deta with post](./05-passing-data-with-post.md)
