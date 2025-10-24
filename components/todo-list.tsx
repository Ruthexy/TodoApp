'use client';

import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import Pagination from './pagination';
import { createTodo, deleteTodo, fetchTodos, updateTodo } from '@/services/todoService';
import ConfirmModal from './confirm-modal';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const TodoList = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const { status } = useSession();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    router.push('/auth/login');
  }

  // ✅ Fetch Todos
  const { data, isLoading } = useQuery({
    queryKey: ['todos', page],
    queryFn: () => fetchTodos(page),
  });

  const { todos, totalPages } = useMemo(() => {
    return {
      todos: data?.todos || [],
      totalPages: data?.totalPages || 1,
    };
  }, [data]);

  // ✅ Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setIsModalOpen(false);
      setSelectedId(null);
    },
  });

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      deleteMutation.mutate(selectedId);
    }
  };

  // ✅ Update Mutation
  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  // ✅ Create Mutation (Fixed Optimistic Update)
  const createMutation = useMutation({
    mutationFn: async (todo: { title: string; completed?: boolean }) => {
      return await createTodo(todo);
    },
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ['todos', page] });

      const previousData = queryClient.getQueryData<{ todos: Todo[]; totalPages: number }>(['todos', page]);
      const previousTodos = previousData?.todos ?? [];

      // Optimistically update cache
      const optimisticTodo: Todo = {
        _id: `temp-${Date.now()}`,
        title: newTodo.title,
        completed: newTodo.completed ?? false,
      };

      queryClient.setQueryData(['todos', page], {
        ...previousData,
        todos: [optimisticTodo, ...previousTodos],
      });

      return { previousData };
    },
    onError: (error, _, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['todos', page], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setNewTodoTitle('');
    },
  });

  // ✅ Filter Logic
  const filteredTodos = useMemo(() => {
    return todos
      .filter((todo: Todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((todo: Todo) => {
        if (statusFilter === 'complete') return todo.completed;
        if (statusFilter === 'incomplete') return !todo.completed;
        return true;
      });
  }, [todos, searchTerm, statusFilter]);

  // ✅ Create Handler
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTodoTitle.trim()) {
      return;
    }

    createMutation.mutate({
      title: newTodoTitle,
      completed: false,
    });
  };

  if (isLoading) return <div className="text-center py-6">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 font-sans">
      <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        Todo List
      </h1>

      <form onSubmit={handleCreate} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add a new todo..."
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <button
          type="submit"
          className="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          {createMutation.isPending ? 'Adding...' : 'Add'}
        </button>
      </form>

      <input
        type="text"
        placeholder="Search todos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
      />

      <div className="flex gap-4 justify-center mb-6 text-gray-600">
        {['all', 'complete', 'incomplete'].map((status) => (
          <label key={status} className="capitalize cursor-pointer">
            <input
              type="radio"
              name="status"
              value={status}
              checked={statusFilter === status}
              onChange={() => setStatusFilter(status)}
              className="mr-1 accent-blue-500"
            />
            {status}
          </label>
        ))}
      </div>

      <ul className="space-y-3">
        {filteredTodos.map((todo: Todo) => (
          <li
            key={todo._id}
            className="flex justify-between items-center border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                className="accent-green-500 w-5 h-5"
                checked={todo.completed}
                onChange={() =>
                  updateMutation.mutate({
                    id: todo._id,
                    title: todo.title,
                    completed: !todo.completed,
                  })
                }
              />
              <Link
                href={`/todos/${todo._id}`}
                className={`${todo.completed
                  ? 'line-through text-gray-400'
                  : 'text-gray-800'
                  } font-medium`}
              >
                {todo.title}
              </Link>
            </div>
            <button
              className="text-red-500 hover:text-red-700 font-medium"
              onClick={() => handleDeleteClick(todo._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-center">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      <ConfirmModal
        open={isModalOpen}
        title="Delete Todo"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="Cancel"
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={deleteMutation.isPending}
      />
    </div>
  );
};

export default TodoList;
