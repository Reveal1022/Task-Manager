import mongoose, { Document, Schema } from "mongoose";

interface ITask extends Document {
  taskName: string;
  taskDescription: string;
  status: "completed" | "to do"; // Enum for task status
}

const taskSchema = new Schema<ITask>({
  taskName: { type: String, required: true },
  taskDescription: { type: String, required: true },
  status: {
    type: String,
    enum: ["completed", "to do"],
    default: "to do", // Default status is 'to do'
    required: true,
  },
});

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
