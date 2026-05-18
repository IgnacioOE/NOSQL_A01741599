const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

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
