import mongoose from "mongoose"

export const connectMongoDB = (url) =>
  mongoose
    .connect(url)
    .then(() => console.log("MongoDB connected!"))
    .catch((err) => console.log("MongoDB Connection Err:", err))
