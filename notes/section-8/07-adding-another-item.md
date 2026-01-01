## Adding Anothers Item

adding new link in navigation for orders

```html
<li class="main-header__item">
  <a class="<%= path === '/orders' ? 'active' : '' %>" href="/orders">Orders</a>
</li>
```

```js
// contorller-shop.js
exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Orders Now 💥",
    path: "/orders",
    activeShop: true,
    productCSS: true,
  });
};

// /routes/shop.js
router.get("/orders", shopController.getOrders);
```
