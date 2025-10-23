const BASE_URL = "https://dummyjson.com/todos";

// --- Types ---
export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface PaginatedTodos {
  todos: Todo[];
  total: number;
  limit: number;
  skip: number;
}

// --- API Functions ---

// Fetch all todos with pagination
export const fetchTodos = async ({
  page = 1,
  limit = 10,
}: {
  page?: number | undefined;
  limit?: number | undefined;
}): Promise<PaginatedTodos> => {
  const skip = (page - 1) * limit;
  const res = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json() as Promise<PaginatedTodos>;
};

// Fetch single todo by ID
export const fetchTodoById = async (id: string | number): Promise<Todo> => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Todo not found");
  return res.json() as Promise<Todo>;
};

// Create new todo
export const createTodo = async (todo: Omit<Todo, "id">): Promise<Todo> => {
  console.log("api called: ", todo)
  const res = await fetch(BASE_URL + "/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  console.log(res)
  if (!res.ok) throw new Error("Failed to create todo");
  return res.json() as Promise<Todo>;
};

// Update existing todo
export const updateTodo = async ({
  id,
  ...updates
}: Partial<Todo> & { id: number }): Promise<Todo> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Failed to update todo");
  return res.json() as Promise<Todo>;
};

// Delete todo
export const deleteTodo = async (id: string | number): Promise<Todo> => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete todo");
  return res.json() as Promise<Todo>;
};
