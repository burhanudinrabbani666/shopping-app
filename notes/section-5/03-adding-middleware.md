## Adding Another Middleware

Middleware functions are functions that have access to the request object **(req)**, the response object **(res)**, and the next middleware function in the application’s request-response cycle. The **next()** middleware function is commonly denoted by a variable named next.

Middleware functions can perform the following tasks:

- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware function in the stack.

```js
// App
const app = express();

//Middleware
app.use((req, res, next) => {
  console.log("in The middleWare");

  next(); // for Continue to another Middleware ⬇️
});

app.use((req, res, next) => {
  console.log("in Another The middleWare");
});

// Server
const server = http.createServer(app);
server.listen(3000); //http://localhost:3000/
```

[Next: How middleware Work](./05-how-middleware-work.md)
