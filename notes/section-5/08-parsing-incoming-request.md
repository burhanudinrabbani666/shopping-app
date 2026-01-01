## Parsing incoming Request

Body-parser is the Node.js body-parsing middleware. It is responsible for parsing the incoming request bodies in a middleware before you handle it. It's commonly used in web applications built with Express.js to **handle form submissions**, JSON payloads, and other types of request bodies.

### What is Body-parser?

body-parser is essential for handling incoming data in a variety of formats, such as JSON, URL-encoded form data, and raw or text data. It transforms this data into a readable format under req.body for easier processing in your application.
Features

- Handles different types of request payloads, including JSON, URL-encoded, raw, and text data.
- Simplifies the process of accessing request data, making it readily available under req.body.
- Works seamlessly with Express.js and other Node.js framework

```bash
npm install --save body-parser
```

```js
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
```

[Next: Limiting middleware](./09-limiting-middleware.md)
