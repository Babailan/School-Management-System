import { MongoClient } from "mongodb";

export async function connectToMongo() {
  try {
    const uri = process.env.MONGO_URL;

    if (!uri) {
      throw new Error("MONGO_URL in .env is required");
    }

    // Create a new MongoClient with options
    const client = new MongoClient(uri);

    // Connect to the MongoDB server
    await client.connect();

    // Return the connected client
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
