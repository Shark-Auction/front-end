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
import AuctionPage from "./pages/UserPage/Auction/AuctionList";
import AuctionDetail from "./pages/UserPage/Auction/AuctionDetail";
import Auction from "./pages/UserPage/Auction";
import SellerProfile from "./pages/UserPage/Seller/SellerProfile";
import AppDashboard from "./core/layout/AppDashboard";
import AuctionManagement from "./pages/AdminPage/AuctionManagement";
import { OrderManagement } from "./pages/UserPage/Profile/components/OrderManagement";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./core/store/store";
import { toast } from "react-toastify";
import CategoryManagement from "./pages/AdminPage/CategoryManagement";
import { logout } from "./core/store/slice/userSlice";
import ErrorPage from "./pages/Error/ErrorPage";
import BrandManagement from "./pages/AdminPage/BrandManagement";
import OriginManagement from "./pages/AdminPage/OriginManagement";
import AdminProductManagement from "./pages/AdminPage/AdminProductManagement";
import VerifyPage from "./pages/Auth/Verify";

import AccountManagement from "./pages/AdminPage/AccountManagement/account";
import StaffManagement from "./pages/AdminPage/AccountManagement/staff";

import ForgotPassword from "./pages/Auth/ForgotPassword";
import React, { Suspense } from "react";
import LoadingComponent from "./components/Loading";
import MyProfile from "./pages/UserPage/Profile/components/MyProfile";
import ChangePassword from "./pages/UserPage/Profile/components/ChangePassword";
import ManagerManagement from "./pages/AdminPage/AccountManagement/manager";
import BlogManagement from "./pages/AdminPage/BlogManagement/index";
import BlogList from "./pages/UserPage/Blog/BlogList";
import BlogDetail from "./pages/UserPage/Blog/BlogDetail";
const ProductManagement = React.lazy(
  () => import("./pages/UserPage/Profile/components/ProductManagement")
);
const RequestProduct = React.lazy(
  () => import("./pages/UserPage/Profile/components/RequestProduct")
);
const UserProfile = React.lazy(() => import("./pages/UserPage/Profile"));
const UserPage = React.lazy(() => import("./pages/UserPage"));
const BlogPage = React.lazy(() => import("./pages/UserPage/Blog"));
const PaymentSuccess = React.lazy(
  () => import("./pages/UserPage/ResultPayment/PaymentSuccess")
);
const PaymentCancel = React.lazy(
  () => import("./pages/UserPage/ResultPayment/PaymentCancel")
);

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
          element: (
            <ProtectedRoute
              element={
                <Suspense fallback={<LoadingComponent />}>
                  <UserPage />
                </Suspense>
              }
              allowedRoles={["User", null]}
            />
          ),
          children: [
            {
              path: "home",
              element: <HomePage />,
            },
            {
              path: "payment-success",
              element: <PaymentSuccess />,
            },
            {
              path: "payment-cancel",
              element: <PaymentCancel />,
            },
            {
              path: "blog",
              element: <BlogPage />,
              children: [
                {
                  path: "",
                  element: <BlogList />,
                },
                {
                  path: ":id",
                  element: <BlogDetail />,
                },
              ],
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
              element: (
                <Suspense fallback={<LoadingComponent />}>
                  <UserProfile />
                </Suspense>
              ),
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
                  element: (
                    <Suspense fallback={<LoadingComponent />}>
                      <ProductManagement />
                    </Suspense>
                  ),
                },
                {
                  path: "request-product",
                  element: (
                    <Suspense fallback={<LoadingComponent />}>
                      <RequestProduct />
                    </Suspense>
                  ),
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
        {
          path: "verify",
          element: <VerifyPage />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute
          allowedRoles={["Admin", "Staff", "Shipper"]}
          element={<AppDashboard />}
        />
      ),
      children: [
        { path: "account-management", element: <AccountManagement /> },
        { path: "staff-management", element: <StaffManagement /> },
        { path: "manager-management", element: <ManagerManagement /> },
        { path: "auction-management", element: <AuctionManagement /> },
        { path: "category-management", element: <CategoryManagement /> },
        { path: "brand-management", element: <BrandManagement /> },
        { path: "origin-management", element: <OriginManagement /> },
        { path: "product-management", element: <AdminProductManagement /> },
        { path: "blog-management", element: <BlogManagement /> },
      ],
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

interface ProtectedRouteProps {
  element: React.ReactElement;
  allowedRoles: any[]; // Define allowed roles for each route
}

const ProtectedRoute = ({ element, allowedRoles }: ProtectedRouteProps) => {
  const userLogin = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  if (!allowedRoles.includes(userLogin && userLogin["roleName"])) {
    toast.error("Từ chối truy cập");
    dispatch(logout());
    return <Navigate to={"/auth/login"} replace />;
  }
  return element;
};

export default App;
