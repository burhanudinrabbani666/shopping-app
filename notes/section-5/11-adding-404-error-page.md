## Adding 404 error page

The res.status() function sets the HTTP status for the response. It is a chainable alias of Node’s response.statusCode.

```js
app.use("/", (req, res, next) => {
  res.status(404).send(`<h1>Page Not Found</h1>`);
});
```

[Next: Filtering Path](./12-filltering-path.md)
