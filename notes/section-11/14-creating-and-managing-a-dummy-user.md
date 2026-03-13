# Creating and managing a dummy user

Creating dummy user

```js
sequelize
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      User.create({ name: "Bani", email: "test@test.com" });
    }

    return user;
  })
  .then(() => {
    app.listen(3001);
  })
  .catch((error) => console.log(error));
```

Adding user to Req

```js
app.use((req, _, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;

      next();
    })
    .catch((error) => console.log(error));
});
```

Next: [Using magic association methods](./15-using-magic-association-methods.md)
