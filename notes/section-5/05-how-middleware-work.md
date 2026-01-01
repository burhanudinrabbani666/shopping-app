## How Middleware Work

use send function to send respons to client

[Express res.send() Function](https://www.geeksforgeeks.org/web-tech/express-js-res-send-function/)

The res.send function is used to send a response in form of various types of data, such as strings, objects, arrays, or buffers, and automatically sets the appropriate Content-Type header based on the data type.

```js
app.use((req, res, next) => {
  console.log("in Another The middleWare");
  res.send(`<h1>Hello From Express</h1>`);
});
```

[Next: Expressjs Behind the Scene](./06-expressjs-behind-the-scene.md)
