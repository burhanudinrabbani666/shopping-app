## Limiting Middleware

The HTTP POST method is used to send data from the client to the server. Unlike GET, which appends data in the URL, POST sends data in the request body, which makes it ideal for form submissions, file uploads, and secure data transfers.

In Node.js, handling POST requests is commonly done using the Express.js framework, which simplifies routing and request handling.

```js
// Only after post method
app.post("/product", (req, res, next) => {
  console.log(req.body, "/product");
  res.redirect("/");
});
```

[Next: Using Express Router](./10-using-express-router.md)
