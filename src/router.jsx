import { createBrowserRouter } from "react-router-dom";
import GuestRoute from "./auth/GuestRoute";
import Landing from "./views/landing";
import Login from "./views/login";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./views/dashboard/DashboardHome";
import MyPackage from "./views/dashboard/MyPackage";
import Payments from "./views/dashboard/Payments";
import Support from "./views/dashboard/Support";
import Account from "./views/dashboard/Account";
import ProtectedRoute from "./auth/ProtectedRoute";
import ShowSubscriptionDetails from "./views/dashboard/ShowSubScriptionDetails";
import Status from "./views/dashboard/Status";
import InternetSignout from "./views/dashboard/InternetSignout";
import NotFound from "./views/NotFound";

export const ROUTE_CONFIG = {
  LANDING: {
    path: "/",
    name: "Landing Page",
    isProtected: false,
    element: <Landing />,
  },
  LOGIN: {
    path: "/login",
    name: "Login Page",
    isProtected: false,
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    ),
  },
  SUBSCRIBE: {
    path: "/subscribe/:packageId",
    name: "Subscribe Page",
    isProtected: false,
    element: <Login />,
  },
  STATUS: { path: "status", element: <Status /> },
  INTERNET_SIGNOUT: { path: "/internet-signout", element: <InternetSignout /> },
  DASHBOARD: {
    path: "/dashboard",
    name: "Dashboard Page",
    isProtected: true,
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "package", element: <MyPackage /> },
      { path: "payments", element: <Payments /> },
      { path: "support", element: <Support /> },
      { path: "account", element: <Account /> },
      { path: "payment/success", element: <ShowSubscriptionDetails /> },
      { path: "payment/success/:reference", element: <ShowSubscriptionDetails /> },
    ],
  },
};

// Create the router with a catch-all 404 route at the end
const router = createBrowserRouter([
  // Map all routes from ROUTE_CONFIG
  ...Object.values(ROUTE_CONFIG).map(
    ({ path, element, children, isProtected, isGuestOnly, roles = [] }) => ({
      path,
      element: isProtected ? (
        <ProtectedRoute roles={roles}>{element}</ProtectedRoute>
      ) : isGuestOnly ? (
        <GuestRoute>{element}</GuestRoute>
      ) : (
        element
      ),
      children,
    })
  ),
  // Add catch-all 404 route at the END
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

export const PATHS = Object.fromEntries(
  Object.entries(ROUTE_CONFIG).map(([key, value]) => [key, value.path]),
);