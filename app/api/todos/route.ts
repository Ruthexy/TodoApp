import { NextResponse } from "next/server";
import { Todo } from "@/models/Todo";
import { connectDB } from "@/lib/mongodb";

// GET /api/todos?page=1
export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = 10;

  const [todos, totalCount] = await Promise.all([
    Todo.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 }),
    Todo.countDocuments(),
  ]);

  return NextResponse.json({
    todos,
    totalPages: Math.ceil(totalCount / limit),
  });
}

// POST /api/todos
export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const todo = await Todo.create(body);
  return NextResponse.json(todo);
}
