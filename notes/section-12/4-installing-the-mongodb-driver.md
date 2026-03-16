# Installing the MongoDB

```bash
npm i mongodb
```

create Client

```js
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") }); // dirname not define

const mongoDB = require("mongodb");
const mongoClient = mongoDB.MongoClient;

function mongoDBConnect(callback) {
  mongoClient
    .connect(process.env.MONGO_DB_URL)
    .then((client) => {
      console.log("Connected");

      callback(client);
    })
    .catch((error) => console.log(error));
}

module.exports = mongoDBConnect;
```

Using in app.js

```js
mongoConnect((client) => {
  console.log(client);

  app.listen(3000);
});
```

Next:[Creating the database connection](./5-creating-the-database-connection.md)
