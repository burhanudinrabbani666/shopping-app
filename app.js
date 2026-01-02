const express = require("express");
const bodyParser = require("body-parser");

// import Routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

// Parser for handling submissions
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware
app.use(adminRoutes);
app.use(shopRoutes);

// simply when the user entering path which not register in server this middleware catch that as a last option.
app.use("/", (req, res, next) => {
  res.status(400).send("<h1>Page Not Found</h1>");
});

// Creating Server
app.listen(3000);
