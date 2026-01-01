## Converting HTML

add-product.pug

```pug
doctype html
html(lang="en")
  head
    meta(charset="UTF-8")
    meta(name="viewport", content="width=device-width, initial-scale=1.0")
    title #{pageTitle}
    link(rel="stylesheet", href="/css/style.css")
    link(rel="stylesheet", href="/css/product.css")
    link(rel="stylesheet", href="/css/forms.css")


  body
      header.main-header
        nav.main-header__nav
          ul.main-header__item-list
            li.main-header__item
              a(href="/") Shop
            li.main-header__item
              a.active(href="/admin/add-product") Add Product

      main
        form.product-form(action="/admin/add-product", method="POST")
          .form-control
            label(for="title") Title
            input(type="text", name="title")#title


          button.btn(type="submit") Add Product
```

404.pug

```pug
doctype html
html(lang="en")
  head
    meta(charset="UTF-8")
    meta(name="viewport", content="width=device-width, initial-scale=1.0")
    title Page Not Found
    link(rel="stylesheet" href="/css/style.css")

  body
    header.main-header
      nav.main-header__nav
        ul.main-header__item-list
          li.main-header__item
            a(href="/") Shop
          li.main-header__item
            a(href="/admin/add-product") Add Product

    h1 Page Not Found!
```

[Next: Adding Layout](./06-adding-layout.md)
