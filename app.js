const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// import Routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.use(bodyParser.urlencoded({ extended: false })); // Parser for handling submissions
app.use(express.static(path.join(__dirname, "public"))); // for serving css staticly

// Middleware
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// simply when the user entering path which not register in server this middleware catch that as a last option.
app.use("/", (req, res, next) => {
  res.status(400).sendFile(path.join(__dirname, "views", "404.html"));
});

// Creating Server
app.listen(3000);
