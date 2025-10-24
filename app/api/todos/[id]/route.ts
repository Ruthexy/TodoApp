import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Todo } from "@/models/Todo";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await params;

  const todo = await Todo.findById(id);

  if (!todo) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(todo);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await connectDB();
  const body = await req.json();

  const updated = await Todo.findByIdAndUpdate(id, body, { new: true });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await connectDB();
  await Todo.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted successfully" });
}
