## Handlebars

we need to import function from express

```js
// app.js
const expressHbs = require("express-handlebars");

app.engine("handlebars", expressHbs());
app.set("view engine", "handlebars");
```

File naming must match the settings.

Handlebars cannot include logic directly in HTML like pug. It must be passed through the props object.

```js
res.render("shop", {
  prods: products,
  pageTitle: "Shop",
  path: "/shop",
  hasProduct: products.length > 0,
});
```

```handlebars
{{#if hasProduct}}
  <div class="grid">
    {{#each prods}}
      <article class="card product-item">
        <header class="card__header">
          <h1 class="product__title">{{this.title}}</h1>
        </header>
        <div class="card__image">
          <img
            src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="A Book"
          />
        </div>
        <div class="card__content">
          <h2 class="product__price">$19.99</h2>
          <p class="product__description">A very interesting book about so many
            even more interesting things!</p>
        </div>
        <div class="card__actions">
          <button class="btn">Add to Cart</button>
        </div>
      </article>
    {{/each}}
  </div>

{{else}}
  <h1>No Product Founds</h1>

{{/if}}
```

[Next: Converting to handlebar](./09-converting-our-project-tohandlebar.md)
