## Storing Product data

1. adding new input field in html add-product.ejs

```html
<div class="form-control">
  <label for="imageUrl">Image Url</label>
  <input type="text" name="imageUrl" id="imageUrl" />
</div>
<div class="form-control">
  <label for="price">Price</label>
  <input type="text" name="price" id="price" />
</div>
<div class="form-control">
  <label for="description">Description Product</label>
  <textarea name="description" id="description" rows="5"></textarea>
</div>
```

2. adding new params in class Product

```js
module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
};
```

3. adding data in controller

```js
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  // save in variable
  const product = new Product(title, imageUrl, price, description);

  // Using Save Method
  product.save();

  res.redirect("/");
};
```

[Next: Displaying Product Data](./05-displaying-product-data.md)
