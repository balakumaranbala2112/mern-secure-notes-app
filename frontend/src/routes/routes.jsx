// FILE: src/routes/routes.jsx
//
// WHY THIS FILE EXISTS:
// Defines ALL URL → component mappings. Two important patterns added:
//
// 1. RootLayout wraps ALL routes with AuthProvider
//    This means AuthProvider is inside the Router context, so
//    child components can use useNavigate(), useLocation() etc.
//    The pattern: root route element = <AuthProvider><MainLayout /></AuthProvider>
//
// 2. ProtectedRoute guards /notes
//    Without it: anyone can navigate to /notes without being logged in.
//
// 3. Root "/" redirects to "/login"
//    Without it: visiting "/" shows a blank page.

import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Notes from "../pages/Notes";
import NotFound from "../NotFound";
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";

// RootLayout: provides AuthContext to ALL routes, then renders the page layout
// This is how we get AuthProvider INSIDE the Router (needed for useNavigate in children)
const RootLayout = () => (
  <AuthProvider>
    <MainLayout />
  </AuthProvider>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      // Root "/" → redirect to login
      { index: true, element: <Navigate to="/login" replace /> },

      // Public routes
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // Protected route — ProtectedRoute checks useAuth().user
      // ✅ logged in → renders Notes
      // ❌ not logged in → redirects to /login
      {
        path: "notes",
        element: (
          <ProtectedRoute>
            <Notes />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
