import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTodos } from '../api/todos';
import Pagination from './Pagination';


const TodoList = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: todos = [], isLoading, error } = useQuery({
    queryKey: ['todos', page],
    queryFn: () => fetchTodos(page),
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

  if (isLoading) return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error loading todos.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Todo List</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search todos..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Search todos by title"
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
            <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
              {todo.title}
            </span>
            <span>
              {todo.completed ? (
                <span className="text-green-500">✅</span>
              ) : (
                <span className="text-gray-400">⬜</span>
              )}
            </span>
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
