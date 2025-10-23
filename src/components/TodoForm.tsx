import React, { useState } from "react";
import type { FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const TodoForm: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newTodo: string) =>
      axios.post("https://jsonplaceholder.typicode.com/todos", {
        title: newTodo,
        completed: false,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setTitle("");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() !== "") {
      mutation.mutate(title);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New todo title"
        className="flex-1 p-2 border rounded-l"
        aria-label="New todo title"
      />
      <button
        type="submit"
        disabled={mutation.status === "pending"}
        className="px-4 bg-blue-600 text-white rounded-r"
      >
        {mutation.status === "pending" ? "Adding..." : "Add"}
      </button>
    </form>
  );
};

export default TodoForm;
