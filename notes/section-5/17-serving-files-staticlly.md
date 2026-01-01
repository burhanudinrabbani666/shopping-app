## Serving Files Staticly

using express statric for serving css file.

```js
express.static();
```

Normally, if we use plain HTML or without Express JS, we just need to link our styles normally. But because this is NodeJS Express, the method is a bit different. We need the method above.

```js
// app.js

app.use(express.static(path.join(__dirname, "public")));
```

This method allows clients to access our public file even though it is read-only (and should be read-only). So, our HTML link to CSS will be slightly different.

```html
<link rel="stylesheet" href="/css/style.css" />
```

[Express: Serving static files in Express](https://expressjs.com/en/starter/static-files.html)

To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.

[Next: Warp up](./18-warp-up.md)
