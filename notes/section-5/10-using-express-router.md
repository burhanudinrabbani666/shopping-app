## Using Express Router

[Geeks: Express express.Router() Function](https://www.geeksforgeeks.org/web-tech/express-js-express-router-function/)

The express.Router() function in Express.js creates a new router object that can handle requests in a modular and organized way. It serves as a mini-application with middleware and routes but is limited to specific segments of your application.

By using express.Router(), you can organize your Express app's routing logic, allowing you to define specific routes and middleware for different parts of your application, such as users, products, or orders, in a more maintainable way.

```js
// app.js

//route
const adminRoute = require("./routes/admin.js");
const shopRoute = require("./routes/shop.js");
// App
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware
app.use(adminRoute);
app.use(shopRoute);
```

```js
// shop.js

const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send(`<h1>Hello From Express</h1>`);
});

module.exports = router;
```

[Next: Adding Error 404](./11-adding-404-error-page.md)
