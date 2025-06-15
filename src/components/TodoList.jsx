import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTodos, updateTodo, deleteTodo, createTodo } from '../api/todos';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';
import '../styles/TodoStyles.css';

const TodoList = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const queryClient = useQueryClient();

  const { data: todos = [], isLoading } = useQuery({
    queryKey: ['todos', page],
    queryFn: () => fetchTodos(page),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setNewTodoTitle('');
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
    if (!newTodoTitle.trim()) return;
    createMutation.mutate({
      title: newTodoTitle,
      completed: false,
      userId: 1,
    });
  };

  if (isLoading) return <div className="text-center">Loading...</div>;

  return (
    <div className="todo-container">
      <h1 className="todo-header">Todo List</h1>

      {/* Create Todo Form */}
      <form onSubmit={handleCreate} className="todo-create-form">
        <input
          type="text"
          placeholder="Add a new todo..."
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          className="todo-input"
        />
        <button type="submit" className="todo-button todo-add">
          {createMutation.isPending ? 'Adding...' : 'Add Todo'}
        </button>
      </form>

      {/* Search */}
      <input
        type="text"
        placeholder="Search todos..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="todo-search"
      />

      {/* Filters */}
      <div className="todo-filters">
        {['all', 'complete', 'incomplete'].map(status => (
          <label key={status}>
            <input
              type="radio"
              name="status"
              value={status}
              checked={statusFilter === status}
              onChange={() => setStatusFilter(status)}
            />{' '}
            {status}
          </label>
        ))}
      </div>

      {/* Todo List */}
      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <li key={todo.id} className="todo-item">
            <input
              type="checkbox"
              className="todo-checkbox"
              checked={todo.completed}
              onChange={() =>
                updateMutation.mutate({ ...todo, completed: !todo.completed })
              }
            />
            <Link
              to={`/todos/${todo.id}`}
              className={`todo-title ${todo.completed ? 'todo-completed' : ''}`}
            >
              {todo.title}
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
        <Pagination currentPage={page} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default TodoList;
