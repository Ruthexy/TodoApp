import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTodos, updateTodo, deleteTodo, createTodo } from "../api/todos";
import { Link } from "react-router-dom";
import Pagination from "./Pagination.js";
import CreateTodo from "./CreateTodo";
import "../styles/TodoStyles.css";

// Todo model
export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId?: number;
}

interface TodosResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

const TodoList: React.FC = () => {
  const [page, setPage] = useState<number|undefined>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "complete" | "incomplete"
  >("all");
  const queryClient = useQueryClient();

  // Fetch Todos
  const { data, isLoading } = useQuery<TodosResponse>({
    queryKey: ["todos", page],
    queryFn: () => fetchTodos({ page }),
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Filtered todos
  const filteredTodos = useMemo(() => {
    const todos: Todo[] = data?.todos || [];
    return todos
      .filter((todo) =>
        todo.todo.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((todo) => {
        if (statusFilter === "complete") return todo.completed;
        if (statusFilter === "incomplete") return !todo.completed;
        return true;
      });
  }, [data, searchTerm, statusFilter]);

  if (isLoading) return <div className="text-center">Loading...</div>;

  return (
    <div className="todo-container">
      <h1 className="todo-header">Todo List</h1>

      {/* Create Todo */}
      <CreateTodo createMutation={createMutation} />

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search todos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="todo-search"
      />

      {/* Status Filters */}
      <div className="todo-filters">
        {["all", "complete", "incomplete"].map((status) => (
          <label key={status}>
            <input
              type="radio"
              name="status"
              value={status}
              checked={statusFilter === status}
              onChange={() =>
                setStatusFilter(status as "all" | "complete" | "incomplete")
              }
            />{" "}
            {status}
          </label>
        ))}
      </div>

      {/* Todo List */}
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <input
              type="checkbox"
              className="todo-checkbox"
              checked={todo.completed}
              onChange={() =>
                updateMutation.mutate({
                  ...todo,
                  completed: !todo.completed,
                })
              }
            />
            <Link
              to={`/todos/${todo.id}`}
              className={`todo-title ${todo.completed ? "todo-completed" : ""}`}
            >
              {todo.todo}
            </Link>
            <div className="todo-actions">
              <button
                className="todo-button todo-delete"
                onClick={() => deleteMutation.mutate(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="pagination">
        <Pagination currentPage={page ?? 1} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default TodoList;
