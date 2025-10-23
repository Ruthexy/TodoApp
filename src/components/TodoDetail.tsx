import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTodoById, updateTodo, deleteTodo } from "../api/todos";

// Todo model
export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId?: number;
}

const TodoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Ensure id is a number
  const todoId = id ? parseInt(id, 10) : undefined;

  const { data: todo, isLoading } = useQuery<Todo>({
    queryKey: ["todo", todoId],
    queryFn: () => {
      if (!todoId) throw new Error("Invalid todo id");
      return fetchTodoById(todoId);
    },
    enabled: !!todoId, // only run if id is valid
  });

  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo", todoId] });
      setEditMode(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => {
      if (!todoId) throw new Error("Invalid todo id");
      return deleteTodo(todoId);
    },
    onSuccess: () => navigate("/"),
  });

  useEffect(() => {
    if (todo) setEditedTitle(todo.todo);
  }, [todo]);

  if (isLoading) return <p>Loading...</p>;
  if (!todo) return <p>Todo not found</p>;

  return (
    <div className="todo-container">
      <button onClick={() => navigate(-1)} className="todo-button todo-back">
        ← Back
      </button>
      <h2 className="todo-detail-title">Todo Details</h2>

      {editMode ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateMutation.mutate({ ...todo, todo: editedTitle });
          }}
        >
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="todo-input"
          />
          <div className="todo-actions">
            <button type="submit" className="todo-button todo-save">
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="todo-button todo-cancel"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="todo-detail-value">
            <strong>ID:</strong> {todo.id}
          </div>
          <div className="todo-detail-value">
            <strong>Title:</strong> {todo.todo}
          </div>
          <div className="todo-detail-value">
            <strong>Completed:</strong> {todo.completed ? "Yes ✅" : "No ❌"}
          </div>
          <div className="todo-actions">
            <button
              onClick={() => setEditMode(true)}
              className="todo-button todo-edit"
            >
              Edit
            </button>
            <button
              onClick={() => deleteMutation.mutate()}
              className="todo-button todo-delete"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoDetail;
