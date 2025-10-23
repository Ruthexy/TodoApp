import TodoList from "@/components/todo-list";

export const metadata = {
  title: 'Todo List',
};

const TodoPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-r from-slate-50 to-blue-50 p-8">
      <TodoList />
    </main>
  )
}

export default TodoPage