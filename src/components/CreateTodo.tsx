
import React from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { UseMutationResult } from "@tanstack/react-query";
import "../styles/TodoStyles.css";

// Define shape of form data
interface CreateTodoFormInputs {
  todo: string;
}

// Define props with mutation typing
interface CreateTodoProps {
  createMutation: UseMutationResult<
    unknown, // response type (can be replaced with your API response type)
    unknown, // error type (could be AxiosError, etc.)
    { todo: string; completed: boolean; userId: number } // variables you pass into mutate()
  >;
}

const CreateTodo: React.FC<CreateTodoProps> = ({ createMutation }) => {
  const { register, handleSubmit, reset } = useForm<CreateTodoFormInputs>();

  const onSubmit: SubmitHandler<CreateTodoFormInputs> = (data) => {
    console.log(data)
    createMutation.mutate({
      todo: data.todo,
      completed: false,
      userId: 1,
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="create-form">
      <input
        type="text"
        {...register("todo", { required: true })}
        placeholder="Enter new todo..."
        className="todo-input"
      />
      <button type="submit" className="todo-button todo-create">
        Add Todo
      </button>
    </form>
  );
};

export default CreateTodo;
