"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTodoById, updateTodo } from "@/services/todoService";

type Todo = {
  id: string;
  title?: string;
  completed?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

interface TodoEditProps {
  id: string;
}

const TodoEdit: React.FC<TodoEditProps> = ({ id }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  // ✅ Fetch Todo
  const { data: todo, isLoading } = useQuery<Todo>({
    queryKey: ["todo", id],
    queryFn: () => fetchTodoById(id),
    enabled: !!id,
  });

  // ✅ Update Mutation
  const mutation = useMutation({
    mutationFn: (updatedData: { title: string; completed: boolean }) =>
      updateTodo({ id, ...updatedData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({ queryKey: ["todo", id] });
      router.push("/todos");
    },
  });

  // ✅ Initialize form state when todo loads
  useEffect(() => {
    if (!todo) return;

    const nextTitle = todo.title ?? "";
    const nextCompleted = Boolean(todo.completed);

    if (title !== nextTitle) setTitle(nextTitle);
    if (completed !== nextCompleted) setCompleted(nextCompleted);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ title, completed });
  };

  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-500">Loading todo...</div>
    );
  }

  if (!todo) {
    return <div className="text-center py-8 text-red-500">Todo not found</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
        Edit Todo
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="accent-green-500 w-5 h-5"
          />
          <label className="text-gray-700 font-medium">Completed</label>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:bg-green-300"
          >
            {mutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoEdit;
