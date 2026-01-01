const http = require("http");
const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
  console.log("in the middleware");

  next(); // Allows the request to continue to the next middleware
});

app.use("/", (req, res, next) => {
  // sending response to client
  res.send(`<h1>Hello from express.js</h1>`);
});

// Creating Server
const server = http.createServer(app);
server.listen(3000);
