const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// import Routes
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

// Set global value: template engine
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false })); // Parser for handling submissions
app.use(express.static(path.join(__dirname, "public"))); // for serving css staticly

// Middleware
app.use("/admin", adminData.routes);
app.use(shopRoutes);

// simply when the user entering path which not register in server this middleware catch that as a last option.
app.use("/", (req, res, next) => {
  res.status(400).render("404", {
    pageTitle: "Page not found",
    path: "",
  });
});

// Creating Server
app.listen(3000);
