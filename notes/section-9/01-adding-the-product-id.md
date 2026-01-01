## Adding The Products List

Now the products have an ID

```html
<li class="main-header__item">
  <a class="<%= path === '/products' ? 'active' : '' %>" href="/products"
    >Products</a
  >
</li>
```

```html
// shop/product-list.ejs

<div class="card__actions">
  <a href="/products/<%= product.id %>" class="btn"> Details </a>

  <form action="/add-to-cart" method="post">
    <button class="btn">Add to Cart</button>
  </form>
</div>
```

```js

  save() {
    this.id = crypto.randomUUID();

    getProductsFromFile((products) => {
      products.push(this);

      // Membuat file json di server
      fs.writeFile(pathData, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }
```

[Next: Extracing Dynamic](./02-extracing-dynamic.md)
