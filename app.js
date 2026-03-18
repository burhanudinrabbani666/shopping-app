const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "./.env") });

// import Routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const { getErrorMessage } = require("./controllers/404");

const User = require("./models/user");

const app = express();

// Set global value: template engine
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false })); // Parser for handling submissions
app.use(express.static("public")); // for serving css staticly
app.use(express.static("images")); // for serving Image staticly

app.use((req, _, next) => {
  return User.findById("69ba4b1eba6c3a96bb28f65d")
    .then((user) => {
      req.user = user;

      next();
    })
    .catch((error) => console.log(error));
});

// Middleware
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// simply when the user entering path which not register in server this middleware catch that as a last option.
app.use("/", getErrorMessage);

// Connecting to mongoose
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "bani",
          email: "bani@example.io",
          cart: { items: [] },
        });

        user.save();
      }
    });

    app.listen(3001);
  })
  .catch((error) => console.log(error));
