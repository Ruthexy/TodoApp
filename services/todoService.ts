const API_BASE = "/api/todos";

// Fetch todos (paginated)
export const fetchTodos = async (page: number) => {
  const res = await fetch(`${API_BASE}?page=${page}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
};

// Fetch a single todo
export const fetchTodoById = async (id: string) => {
  const res = await fetch(`${API_BASE}/${id}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch todo: ${res.statusText}`);
  }
  const data = await res.json();
  return data.todo ?? data;
};

// ✅ Create a todo
export const createTodo = async (newTodo: { title: string; completed?: boolean }) => {
  console.log("🟢 createTodo service called with:", newTodo);
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Create failed:", errorText);
    throw new Error(`Failed to create todo: ${res.statusText}`);
  }

  return res.json();
};

// ✅ Update a todo
export const updateTodo = async (todo: { id: string; title: string; completed: boolean }) => {
  const res = await fetch(`${API_BASE}/${todo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });

  if (!res.ok) throw new Error("Failed to update todo");
  return res.json();
};

// ✅ Delete a todo
export const deleteTodo = async (id: string) => {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete todo");
  return res.json();
};
