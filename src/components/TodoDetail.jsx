import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import '../styles/TodoStyles.css'; // make sure this path is correct

const fetchTodoById = async (id) => {
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
  return data;
};

const updateTodo = async (updatedTodo) => {
  const { data } = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`, updatedTodo);
  return data;
};

const deleteTodo = async (id) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
};

const TodoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');

  const { data: todo, isLoading, isError, error } = useQuery({
    queryKey: ['todo', id],
    queryFn: () => fetchTodoById(id),
  });

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todo', id] });
      setEditMode(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      navigate('/');
    },
  });

  useEffect(() => {
    if (todo) setEditedTitle(todo.title);
  }, [todo]);

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (isError) return <div className="text-red-500 text-center">Error: {error.message}</div>;

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
            updateMutation.mutate({ ...todo, title: editedTitle });
          }}
        >
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="todo-input"
          />
          <div className="todo-actions">
            <button type="submit" className="todo-button todo-save">
              {updateMutation.isPending ? 'Saving...' : 'Save'}
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
            <span className="todo-detail-label">ID:</span> {todo.id}
          </div>
          <div className="todo-detail-value">
            <span className="todo-detail-label">Title:</span> {todo.title}
          </div>
          <div className="todo-detail-value">
            <span className="todo-detail-label">Completed:</span>{' '}
            {todo.completed ? 'Yes ✅' : 'No ❌'}
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
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoDetail;
