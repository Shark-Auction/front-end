import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./core/layout/AppLayout";
import LandingPage from "./pages/LandingPage";
import './App.css'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: '',
          element: <LandingPage />,
        }
      ]
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
