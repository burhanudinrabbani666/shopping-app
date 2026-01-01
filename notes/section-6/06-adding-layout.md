## Adding layout

pertIt's also necessary to create folders and files for layouts that are rendered multiple times on each page.

Here, for example, is the HTML head section and navigation.

-- layouts => main-layout.pug

```pug
doctype html
html(lang="en")
  head
    meta(charset="UTF-8")
    meta(name="viewport", content="width=device-width, initial-scale=1.0")
    title Page Not Found
    link(rel="stylesheet" href="/css/style.css")
    block style
  body
    header.main-header
      nav.main-header__nav
        ul.main-header__item-list
          li.main-header__item
            a(href="/") Shop
          li.main-header__item
            a(href="/admin/add-product") Add Product

    block content
```

Syntax block is used to add additional elements to each page.

example in other page

add-layout.pug

```pug
extends layouts/main-layout.pug

block style
  link(rel="stylesheet", href="/css/product.css")
  link(rel="stylesheet", href="/css/forms.css")


block content
  main
    form.product-form(action="/admin/add-product", method="POST")
      .form-control
        label(for="title") Title
        input(type="text", name="title")#title

      button.btn(type="submit") Add Product
```

[Next: Finishing pug template](./07-finishing-pug-template.md)
