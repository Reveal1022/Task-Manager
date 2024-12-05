import express, { Application } from "express";
import cors from "cors";
import userRoutes from "./routes/user";
import taskRoutes from "./routes/tasks";
import { connectDB } from "./db";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api", userRoutes);
app.use("/api", taskRoutes);

//DB Connection
connectDB();

app.listen(3005, () => {
  console.log("server running on port 3000");
});
