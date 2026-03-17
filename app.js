const express = require("express");
const bodyParser = require("body-parser");

// import Routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const { getErrorMessage } = require("./controllers/404");

const User = require("./models/user");

// MongoDB CLient
const { mongoDBConnect } = require("./utils/database");

const app = express();

// Set global value: template engine
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false })); // Parser for handling submissions
app.use(express.static("public")); // for serving css staticly
app.use(express.static("images")); // for serving Image staticly

app.use((req, _, next) => {
  return User.findUserById("69b8c1e3b387ed269d055ffd")
    .then((user) => {
      req.user = new User(user.username, user.name, user.cart, user._id);

      next();
    })
    .catch((error) => console.log(error));
});

// Middleware
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// simply when the user entering path which not register in server this middleware catch that as a last option.
app.use("/", getErrorMessage);

mongoDBConnect(() => {
  app.listen(3001);
});
