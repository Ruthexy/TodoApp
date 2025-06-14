import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Pagination from './Pagination';

const fetchTodos = async (page) => {
  const res = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=10&_page=${page}`);
  return res.data;
};

const TodoList = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCompleted, setNewCompleted] = useState(false);
  const queryClient = useQueryClient();

  const { data: todos = [], isLoading, error } = useQuery({
    queryKey: ['todos', page],
    queryFn: () => fetchTodos(page),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos', page]);
    },
  });

  const toggleMutation = useMutation({
    mutationFn: (todo) =>
      axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
        ...todo,
        completed: !todo.completed,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos', page]);
    },
  });

  const createMutation = useMutation({
    mutationFn: (newTodo) =>
      axios.post('https://jsonplaceholder.typicode.com/todos', newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos', page]);
      setShowForm(false);
      setNewTitle('');
      setNewCompleted(false);
    },
  });

  const filteredTodos = useMemo(() => {
    return todos
      .filter(todo =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(todo => {
        if (statusFilter === 'complete') return todo.completed;
        if (statusFilter === 'incomplete') return !todo.completed;
        return true;
      });
  }, [todos, searchTerm, statusFilter]);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    createMutation.mutate({ title: newTitle, completed: newCompleted, userId: 1 });
  };

  if (isLoading) return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error loading todos.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Todo List</h1>

      {/* Create Button */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {showForm ? 'Cancel' : 'Create Todo'}
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <form onSubmit={handleCreate} className="mb-6 p-4 border rounded bg-gray-50 space-y-4">
          <input
            type="text"
            placeholder="New todo title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={newCompleted}
              onChange={() => setNewCompleted(!newCompleted)}
            />
            <span>Mark as completed</span>
          </label>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Todo
          </button>
        </form>
      )}

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search todos..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Status Filter */}
      <div className="flex gap-4 mb-4">
        {['all', 'complete', 'incomplete'].map(status => (
          <label key={status} className="flex items-center space-x-1 text-sm text-gray-700">
            <input
              type="radio"
              name="status"
              value={status}
              checked={statusFilter === status}
              onChange={() => setStatusFilter(status)}
              className="accent-blue-500"
            />
            <span className="capitalize">{status}</span>
          </label>
        ))}
      </div>

      {/* Todo List */}
      <ul className="space-y-2">
        {filteredTodos.map(todo => (
          <li
            key={todo.id}
            className="flex justify-between items-center p-3 bg-white rounded shadow hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-3 w-full">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleMutation.mutate(todo)}
              />
              <span className={`flex-1 ${todo.completed ? 'line-through text-red-500' : ''}`}>
                {todo.title}
              </span>
              <button
                onClick={() => deleteMutation.mutate(todo.id)}
                className="ml-2 px-2 py-1 text-sm bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="mt-6">
        <Pagination currentPage={page} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default TodoList;
