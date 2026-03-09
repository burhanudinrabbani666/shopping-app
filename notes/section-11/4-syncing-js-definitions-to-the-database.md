# Syncing js definitions to the database

```js
sequelize
  .sync()
  .then((result) => {
    // Creating Server
    app.listen(3001);
  })
  .catch((error) => console.log(error));
```

Next: [Inserting data and creating a product](./5-inserting-data-and-creating-a-product.md)
