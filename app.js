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

// Creating Server
app.listen(3000);
