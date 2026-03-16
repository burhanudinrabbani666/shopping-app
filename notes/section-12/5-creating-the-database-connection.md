# Creating the database connecting

```js
let _db;

function mongoDBConnect(callback) {
  mongoClient
    .connect(process.env.MONGO_DB_URL)
    .then((client) => {
      console.log("Connected!");
      _db = client.db();
      callback();
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

function getDB() {
  if (_db) return _db;

  throw "No Database Found!";
}

exports.mongoDBConnect = mongoDBConnect;
exports.getDB = getDB;
```

Next: [Finishing the database connection](./6-finishing-the-database-connection.md)
