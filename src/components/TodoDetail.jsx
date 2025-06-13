import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const fetchTodoById = async (id) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );
  return response.data;
};

const TodoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: todo,
    isLoading,
    error,
  } = useQuery(['todo', id], () => fetchTodoById(id));
 
 const queryClient = useQueryClient();
 const [editMode, setEditMode] = React.useState(false);
 const [editedTitle, setEditedTitle] = React.useState(todo.title);
 const updateMutation = useMutation(
 updated => axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`,
 updated),
 { onSuccess: () => queryClient.invalidateQueries(['todo', id]) }
 );
 const deleteMutation = useMutation(
 () => axios.delete(`https://jsonplaceholder.typicode.com/todos/${todo.id}`),
 { onSuccess: () => navigate('/') }
 );

 {editMode ? (
 <form onSubmit={e => { e.preventDefault(); updateMutation.mutate({ title:
 editedTitle, completed: todo.completed }); setEditMode(false); }}>
 <input
 value={editedTitle}
 onChange={e => setEditedTitle(e.target.value)}
 className="border p-1"
 aria-label="Edit todo title"
 />
 <button type="submit" className="ml-2 px-2 py-1 bg-green-500 text-white 
rounded">Save</button>
 </form>
 ) : (
<button onClick={() => setEditMode(true)} className="px-2 py-1 bg-yellow-500 
text-white rounded">Edit</button>
 )}
 <button onClick={() => deleteMutation.mutate()} className="ml-2 px-2 py-1 bg
red-500 text-white rounded">
 Delete
 </button>
 
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading todo.</div>;

  return (
    <div className="p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-1 border rounded"
      >
        &larr; Back
      </button>
      <h2 className="text-xl font-semibold mb-2">Todo Details</h2>
      <div className="space-y-2">
        <p>
          <strong>ID:</strong> {todo.id}
        </p>
        <p>
          <strong>Title:</strong> {todo.title}
        </p>
        <p>
          <strong>Completed:</strong> {todo.completed ? 'Yes' : 'No'}
        </p>
      </div>
    </div>
  );
};

export default TodoDetail;
