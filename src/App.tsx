import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./core/layout/AppLayout";
import LandingPage from "./pages/LandingPage";
import "./App.css";
import AuthPage from "./pages/Auth";
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";
import HomePage from "./pages/UserPage/Home";
import UserPage from "./pages/UserPage";
import AuctionPage from "./pages/UserPage/Auction";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "",
          element: <LandingPage />,
        },
        {
          path: "u",
          element: <UserPage />,
          children: [
            {
              path: "home",
              element: <HomePage />,
            },
            {
              path: "auction",
              element: <AuctionPage />
            }
          ],
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthPage />,
      children: [
        {
          path: "",
          element: <Navigate to={"login"} replace />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
