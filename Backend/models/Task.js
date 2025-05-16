import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    dueDate: String,
    assignee: String,
    priority: String,
    label: String,
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
