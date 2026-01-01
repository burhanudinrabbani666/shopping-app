## Outplaying dynamic content

We can give a title via Java script and then HTML dynamically because the view engine has been set to take data from the object sent.

```js
// shop.js

router.get("/", (req, res, next) => {
  const products = adminData.product;
  res.render("shop", { prods: products, docsTitle: "Shop" });
});
```

```pug
doctype html
html(lang="en")
  head
    meta(charset="UTF-8")
    meta(name="viewport", content="width=device-width, initial-scale=1.0")
    title #{docsTitle}
    link(rel="stylesheet", href="/css/style.css")
    link(rel="stylesheet", href="/css/product.css")
```

and can also do logic

```pug
 main
        if prods.length >0
          .grid
            each product in prods
              article.card.product-item
                  header.card__header
                      h1.product__title #{product.title}
                  .card__image
                      img(src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A Book")
                  .card__content
                      h2.product__price $19.99
                      p.product__description A very interesting book about so many even more interesting things!
                  .card__actions
                      button.btn Add to Cart
        else
          h1 No Products
```

[Next: Converting HTML](./05-converting-html.md)
