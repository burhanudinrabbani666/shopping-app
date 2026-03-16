const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

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
