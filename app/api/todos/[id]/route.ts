import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Todo } from "@/models/Todo";
import { getCurrentUser } from "@/lib/current-user";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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

  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const todo = await Todo.findOneAndUpdate(
    { _id: id, userId: user._id },
    body,
    { new: true }
  );

  if (!todo) return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  return NextResponse.json(todo);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await connectDB();
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const deleted = await Todo.findOneAndDelete({ _id: id, userId: user._id });
  if (!deleted) return NextResponse.json({ error: "Todo not found" }, { status: 404 });

  return NextResponse.json({ message: "Deleted successfully" });
}
