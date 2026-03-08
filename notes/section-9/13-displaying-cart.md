# Displaying Cart

```js
exports.getCart = (req, res, next) => {
  /*
  {
    "products":[
      {
        "id": string,
        "quantity": number
      }
    ],
    "totalPrice": number
  }  
  */

  Cart.getAllProducts((cart) => {
    Product._fetchAll((products) => {
      const cartProducts = [];

      /*
        [
          {
            "id": string,
            "title": string,
            "imageUrl": string
            "description": string,
            "price": number
          }
        ]
      */

      for (let product of products) {
        const cartProductsData = cart.products.find(
          (prod) => prod.id === product.id,
        );

        if (cartProductsData) {
          cartProducts.push({
            productData: product,
            qty: cartProductsData.quantity,
          });
        }
      }

      res.render("shop/cart", {
        pageTitle: "Cart - Shop",
        path: "/cart",
        products: cartProducts,
      });
    });
  });
};
```

Next: [Deleting cart items](./14-deleting-cart-items.md)
