import { Router } from "express";
import {
  createTask,
  getTasks,
  deleteTask,
} from "../controllers/taskController";

const router = Router();

// POST Create a new task
router.post("/tasks", createTask);

// GET Fetch all tasks
router.get("/tasks", getTasks);

// DELETE Delete a task
router.delete("/tasks/:taskId", deleteTask);

export default router;
