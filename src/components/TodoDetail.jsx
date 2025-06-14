import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const fetchTodoById = async (id) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
  return response.data;
};

const TodoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: todo, isLoading, error } = useQuery({
    queryKey: ['todo', id],
    queryFn: () => fetchTodoById(id),
  });

  const [editMode, setEditMode] = React.useState(false);
  const [editedTitle, setEditedTitle] = React.useState('');

  React.useEffect(() => {
    if (todo) {
      setEditedTitle(todo.title);
    }
  }, [todo]);

  // ✅ Update mutation (edit title or toggle completed)
  const updateMutation = useMutation({
    mutationFn: (updatedTodo) =>
      axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, updatedTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todo', id] });
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setEditMode(false);
    },
  });

  // ✅ Delete mutation
  const deleteMutation = useMutation({
    mutationFn: () => axios.delete(`https://jsonplaceholder.typicode.com/todos/${todo.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      navigate('/');
    },
  });

  // ✅ Toggle completed
  const toggleCompleted = () => {
    updateMutation.mutate({
      ...todo,
      completed: !todo.completed,
    });
  };

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error loading todo.</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-1 border rounded hover:bg-gray-100"
      >
        &larr; Back
      </button>

      <h2 className="text-2xl font-bold mb-4 text-blue-700">Todo Details</h2>

      {editMode ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateMutation.mutate({ ...todo, title: editedTitle });
          }}
          className="space-y-3"
        >
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="border p-2 w-full rounded"
            aria-label="Edit todo title"
          />
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="space-y-2 mb-4 text-gray-800">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={toggleCompleted}
                className="w-4 h-4"
              />
              <span
                className={`text-lg ${
                  todo.completed ? 'text-red-600 line-through' : 'text-black'
                }`}
              >
                {todo.title}
              </span>
            </label>

            <p><strong>ID:</strong> {todo.id}</p>
            <p>
              <strong>Status:</strong>{' '}
              <span className={todo.completed ? 'text-green-600' : 'text-red-500'}>
                {todo.completed ? 'Completed' : 'Incomplete'}
              </span>
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => deleteMutation.mutate()}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
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
