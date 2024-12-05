import mongoose from "mongoose";

// const DB_PASSWORD = "gVvPdlYfKoyRyoIy";
// const CONNECTION_URI = `mongodb+srv://mehuman2001:${DB_PASSWORD}@cluster0.ol76i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const CONNECTION_URI = `mongodb://localhost:27017/task-tracker`;

export const connectDB = async () => {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(CONNECTION_URI);
    console.log("Connected to database");
  } catch (err) {
    console.log("Error connecting db", err);
    process.exit(1);
  }
};
