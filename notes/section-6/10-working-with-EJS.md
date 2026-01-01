## Working with EJS

[EJS](https://ejs.co/)

What is the "E" for? "Embedded?" Could be. How about "Effective," "Elegant," or just "Easy"? EJS is a simple templating language that lets you generate HTML markup with plain JavaScript. No religiousness about how to organize things. No reinvention of iteration and control-flow. It's just plain JavaScript.

> The most recommended template engine

```js
// app.js
app.set("view engine", "ejs");
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title><%= pageTitle %></title>
    <link rel="stylesheet" href="/css/style.css" />
    <link rel="stylesheet" href="/css/product.css" />
  </head>

  <body>
    <header class="main-header">
      <nav class="main-header__nav">
        <ul class="main-header__item-list">
          <li class="main-header__item"><a class="active" href="/">Shop</a></li>
          <li class="main-header__item">
            <a href="/admin/add-product">Add Product</a>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <% if(prods.length > 0) { %>
      <div class="grid">
        <% for(let product of prods) { %>
        <article class="card product-item">
          <header class="card__header">
            <h1 class="product__title"><%= product.title %></h1>
          </header>
          <div class="card__image">
            <img
              src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="A Book"
            />
          </div>
          <div class="card__content">
            <h2 class="product__price">$19.99</h2>
            <p class="product__description">
              A very interesting book about so many even more interesting
              things!
            </p>
          </div>
          <div class="card__actions">
            <button class="btn">Add to Cart</button>
          </div>
        </article>
        <% } %>
      </div>
      <% } else {%>
      <h1>No Product Found!</h1>

      <% } %>
    </main>
  </body>
</html>
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Add Product</title>
    <link rel="stylesheet" href="/css/style.css" />
    <link rel="stylesheet" href="/css/forms.css" />
    <link rel="stylesheet" href="/css/product.css" />
  </head>

  <body>
    <header class="main-header">
      <nav class="main-header__nav">
        <ul class="main-header__item-list">
          <li class="main-header__item"><a href="/">Shop</a></li>
          <li class="main-header__item">
            <a class="active" href="/admin/add-product">Add Product</a>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <form class="product-form" action="/admin/add-product" method="POST">
        <div class="form-control">
          <label for="title">Title</label>
          <input type="text" name="title" id="title" />
        </div>

        <button class="btn" type="submit">Add Product</button>
      </form>
    </main>
  </body>
</html>
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title><%= pageTitle %></title>
    <link rel="stylesheet" href="/css/style.css" />
  </head>

  <body>
    <header class="main-header">
      <nav class="main-header__nav">
        <ul class="main-header__item-list">
          <li class="main-header__item"><a href="/">Shop</a></li>
          <li class="main-header__item">
            <a href="/admin/add-product">Add Product</a>
          </li>
        </ul>
      </nav>
    </header>
    <h1>Page Not Found!</h1>
  </body>
</html>
```
