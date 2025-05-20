import mongoose, { Connection } from "mongoose";

let cachedConnection: Connection | null = null;

export async function connectToMongoDB() {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not defined in .env.local");
    }
    const newConnection = await mongoose.connect(uri);

    cachedConnection = newConnection.connection;
    return cachedConnection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
