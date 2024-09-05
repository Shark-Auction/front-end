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
import AuctionPage from "./pages/UserPage/Auction/AuctionList";
import AuctionDetail from "./pages/UserPage/Auction/AuctionDetail";
import Auction from "./pages/UserPage/Auction";
import SellerProfile from "./pages/UserPage/Seller/SellerProfile";
import AppDashboard from "./core/layout/AppDashboard";
import AuctionManagement from "./pages/AdminPage/AuctionManagement";
import UserProfile from "./pages/UserPage/Profile";
import { MyProfile } from "./pages/UserPage/Profile/components/MyProfile";
import { ChangePassword } from "./pages/UserPage/Profile/components/ChangePassword";
import { OrderManagement } from "./pages/UserPage/Profile/components/OrderManagement";
import { ProductManagement } from "./pages/UserPage/Profile/components/ProductManagement";
import { RequestProduct } from "./pages/UserPage/Profile/components/RequestProduct";
import { useSelector } from "react-redux";
import { RootState } from "./core/store/store";
import { toast } from "react-toastify";

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
              element: <Auction />,
              children: [
                {
                  path: "",
                  element: <AuctionPage />,
                },
                {
                  path: ":id",
                  element: <AuctionDetail />,
                },
              ],
            },
            {
              path: "seller/:id",
              element: <SellerProfile />,
            },
            {
              path: "profile",
              element: <UserProfile />,
              children: [
                {
                  path: "",
                  element: <MyProfile />,
                },
                {
                  path: "change-password",
                  element: <ChangePassword />,
                },
                {
                  path: "order-management",
                  element: <OrderManagement />,
                },
                {
                  path: "your-management",
                  element: <ProductManagement />,
                },
                {
                  path: "request-product",
                  element: <RequestProduct />,
                },
              ],
            },
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
    {
      path: "/admin",
      element: <ProtectedRoute element={<AppDashboard />} />,
      children: [
        { path: "auction-management", element: <AuctionManagement /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const userLogin = useSelector((state: RootState) => state.user);
  console.log(userLogin);
  if (!userLogin || userLogin["roleName"] !== "admin") {
    toast.error("Từ chối truy cập");
    return <Navigate to="/u/home" replace />;
  }

  return element;
};

export default App;
