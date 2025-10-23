import axios from "axios";

const BASE_URL = "/api/todos";

// Fetch todos (paginated)
export const fetchTodos = async (page: number) => {
  const res = await fetch(`/api/todos?page=${page}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
};

// Fetch a single todo
export const fetchTodoById = async (id: string) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};

// Create a todo
export const createTodo = async (newTodo: { title: string; completed?: boolean }) => {
  const res = await axios.post(BASE_URL, newTodo);
  return res.data;
};

// Update a todo
export const updateTodo = async (todo: { id: string; title: string; completed: boolean }) => {
  const res = await axios.put(`${BASE_URL}/${todo.id}`, todo);
  return res.data;
};

// Delete a todo
export const deleteTodo = async (id: string) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};
