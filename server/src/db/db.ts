import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("Missing MONGO env variable");
    }
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Database Connection Failed", error);
    process.exit(1);
  }
};
