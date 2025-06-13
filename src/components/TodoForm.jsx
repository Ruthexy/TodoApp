 import React from 'react';
 import { useMutation, useQueryClient } from '@tanstack/react-query';
 import axios from 'axios';
 const TodoForm = () => {
 const [title, setTitle] = React.useState('');
 const queryClient = useQueryClient();
 const mutation = useMutation(
 newTodo => axios.post('https://jsonplaceholder.typicode.com/todos', {
 title: newTodo, completed: false }),
 {
 onSuccess: () => {
 queryClient.invalidateQueries(['todos']);
 setTitle('');
 },
 }
 );
 return (
 <form onSubmit={e => { e.preventDefault(); mutation.mutate(title); }}
 className="flex mb-4">
 <input
 type="text"
 value={title}
 onChange={e => setTitle(e.target.value)}
 placeholder="New todo title"
 className="flex-1 p-2 border rounded-l"

aria-label="New todo title"
 />
 <button type="submit" disabled={mutation.isLoading} className="px-4 bg
blue-600 text-white rounded-r">
 {mutation.isLoading ? 'Adding...' : 'Add'}
 </button>
 </form>
 );
 };
 export default TodoForm;
 