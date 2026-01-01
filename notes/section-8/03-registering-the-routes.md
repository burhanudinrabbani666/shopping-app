## Registering The Routes

adding route in admin.js and shop.js

```js
// admin.js

router.get("/add-product", adminController.getAddProduct);
router.get("/products", adminController.getProducts);

// shop.js

router.get("/products", shopController.getProducts);
router.get("/cart", shopController.getCart);
router.get("/checkout", shopController.getCheckout);
```

[Next: Storing data](./04-soring-product-data.md)
