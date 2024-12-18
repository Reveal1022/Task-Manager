import { Request, RequestHandler, Response } from "express";
import Task from "../models/TaskModel";

type TaskStatus = "todo" | "completed";
type CreateTaskDto = {
  taskName: string;
  taskDescription: string;
  status: TaskStatus;
};

// Create a new task
export const createTask: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { taskName, taskDescription } = req.body;

  console.log(req.body);

  if (!taskName || !taskDescription) {
    res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newTask = new Task({
      taskName,
      taskDescription,
    });
    await newTask.save();
    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (err) {
    res.status(500).json({ message: "Error creating task", error: err });
  }
};

// Get all tasks
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ message: "Error fetching tasks", error: err });
  }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  console.log(taskId);

  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task", error: err });
  }
};
