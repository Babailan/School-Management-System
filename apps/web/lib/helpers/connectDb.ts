import { MongoClient } from "mongodb";

export default async function connectDB() {
  try {
    const uri = "mongodb://localhost:27017";

    // Create a new MongoClient
    const client = new MongoClient(uri);

    // Connect to the MongoDB server
    return await client.connect();
  } catch (error) {
    throw Error("Bad Connection");
  }
}
