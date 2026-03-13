# Adding a one to many relationship

Associations

```js
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
```

Next: [Creating and managing a dummy user](./14-creating-and-managing-a-dummy-user.md)
