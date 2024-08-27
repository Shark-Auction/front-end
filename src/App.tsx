import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./core/layout/AppLayout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
