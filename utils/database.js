const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const mongoDB = require("mongodb");
const mongoClient = mongoDB.MongoClient;

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
