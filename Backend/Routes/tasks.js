import express from "express";
import { Task } from "../models/Task.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Task creation failed", details: err.message });
  }
});

export default router;
