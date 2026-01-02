## Adding 404 error page

The res.status() function sets the HTTP status for the response. It is a chainable alias of Node’s response.statusCode.

```js
// simply when the user entering path which not register in server this middleware catch that as a last option.
app.use("/", (req, res, next) => {
  res.status(400).send("<h1>Page Not Found</h1>");
});
```

[Next: Filtering Path](./12-filltering-path.md)
