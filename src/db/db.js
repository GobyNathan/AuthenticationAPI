const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const uri = process.env.MONGODB_URI;
let client;

async function connectDB() {
  if (!client) {
    try {
      client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
      await client.connect();
      console.log("Connected to MongoDB");
    } catch (error) {
      throw error;
    }
  }
  return client.db("users");
}

module.exports = { connectDB };