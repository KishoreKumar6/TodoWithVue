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

router.get("/:label", async (req, res) => {
  try {
    const tasks = await Task.find({
      label: new RegExp(`^${req.params.label}$`, "i"),
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
