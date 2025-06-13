import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TodoList from './components/TodoList';
import Home from './home'; // Adjust path as needed
import NotFound from './components/NotFound'; // Adjust path as needed
// import TodoDetail from '../components/TodoDetail'; // Uncomment when ready

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/todos', // Use this for TodoList, not /todos/:id
    element: <TodoList />,
  },
  // {
  //   path: '/todos/:id',
  //   element: <TodoDetail />, // Optional: for individual todo detail
  // },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
