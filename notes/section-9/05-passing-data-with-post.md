## Passing Data With Post

added a new button that we can render on any page !! cool

```html
<!-- includes/add-to-cart -->

<form action="/cart" method="post">
  <button type="submit" class="btn">Add to Cart</button>
  <input type="hidden" name="productId" value="<%= product.id %>" />
</form>
```

on the page that contains the button. must enter data via the second argument. only doing this if the include inside for lop

```html
<div><%- include('../includes/add-to-cart', {product: product}) %></div>
```

we also add post method in our shop routes file

```js
// routes/ admin.js

router.post("/cart", postCart);
```

and the function. still just for checking

```js
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);

  res.redirect("/cart");
};
```

Next: [Adding cart model](./06-adding-cart-model.md)
