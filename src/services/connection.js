import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

export async function connectMongo() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connection successful");
  } catch (error) {
    console.log("err", error);
  }
}
// `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.yp9y5jj.mongodb.net/test`