## Working on the layout

To make life easier, don't cut the HTML in half. Cut the entire section you want to distribute to other files.

```html
<!-- shop.ejs -->

<head>
  <%- include('includes/head') %>
  <link rel="stylesheet" href="/css/product.css" />
</head>
```

```html
<!-- head.ejs -->

<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="ie=edge" />
<title><%= pageTitle %></title>
<link rel="stylesheet" href="/css/style.css" />
```

[Next: Warp Up](./12-warp-up.md)
