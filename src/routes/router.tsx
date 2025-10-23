import { createBrowserRouter } from "react-router-dom";
import Home from "../login";
import TodoList from "../components/TodoList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/todos",
    element: <TodoList />,
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);
