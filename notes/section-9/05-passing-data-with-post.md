## Passing Data With Post

added a new button that we can render on any page !! cool

```html
<!-- includes/add-to-cart -->

<form action="/cart" method="post">
  <button type="submit" class="btn">Add to Cart</button>
  <input type="hidden" name="productId" value="<%= product.id %>" />
</form>
```

on the page that contains the button. must enter data via the second argument

```html
<div><%- include('../includes/add-to-cart', {product: product}) %></div>
```

<hr>

we also add post method in our shop routes file

```js
// routes/ admin.js

router.post("/cart", shopController.postCart);
```

and the function.

```js
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);

  res.redirect("/cart");
};
```
