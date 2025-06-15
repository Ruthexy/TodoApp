import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

// Fetch todos (paginated)
export const fetchTodos = async (page = 1) => {
  const response = await axios.get(`${BASE_URL}?_page=${page}&_limit=10`);
  return response.data;
};

// Fetch a single todo by ID
export const fetchTodoById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

// Create a new todo
export const createTodo = async (newTodo) => {
  const response = await axios.post(BASE_URL, newTodo);
  return response.data;
};

// Update a todo
export const updateTodo = async (todo) => {
  const response = await axios.put(`${BASE_URL}/${todo.id}`, todo);
  return response.data;
};

// Delete a todo
export const deleteTodo = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
