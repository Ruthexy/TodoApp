import TodoEdit from "@/components/todo-edit";

interface TodoEditPageProps {
  params: Promise<{ id: string }>;
}

const TodoEditPage = async ({ params }: TodoEditPageProps) => {
  const { id } = await params;

  return (
    <div className="max-w-3xl mx-auto py-10">
      <TodoEdit id={id} />
    </div>
  );
};

export default TodoEditPage;
