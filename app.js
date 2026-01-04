const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const expressHbs = require("express-handlebars");

// import Routes
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

// Set global value: template engine
app.engine("handlebars", expressHbs()); // handlebars @3
app.set("view engine", "handlebars");
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
  });
});

// Creating Server
app.listen(3000);
