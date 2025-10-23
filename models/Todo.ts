import mongoose, { Schema, model, models } from "mongoose";

const TodoSchema = new Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Todo = models.Todo || model("Todo", TodoSchema);
