import { createBrowserRouter } from "react-router-dom";
import TodoList from "./components/TodoList";
import Home from "./login"; // Adjust path as needed
import NotFound from "./components/NotFound"; // Adjust path as needed
// import TodoDetail from '../components/TodoDetail'; // Uncomment when ready

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/todos", // Use this for TodoList, not /todos/:id
    element: <TodoList />,
  },
  // {
  //   path: '/todos/:id',
  //   element: <TodoDetail />, // Optional: for individual todo detail
  // },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
