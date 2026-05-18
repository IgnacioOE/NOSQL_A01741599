const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || "mongodb://a01741599:Ignacio12345@ac-wyrvvbb-shard-00-00.tatbc0n.mongodb.net:27017,ac-wyrvvbb-shard-00-01.tatbc0n.mongodb.net:27017,ac-wyrvvbb-shard-00-02.tatbc0n.mongodb.net:27017/?ssl=true&replicaSet=atlas-jmyezk-shard-0&authSource=admin&retryWrites=true&w=majority";
const dbName = process.env.MONGODB_DB || "test";

const client = new MongoClient(uri);
let cachedDb = null;

async function connectDB() {
  if (!cachedDb) {
    await client.connect();
    cachedDb = client.db(dbName);
  }
  return cachedDb;
}

module.exports = { connectDB };
