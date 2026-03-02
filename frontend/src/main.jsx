// FILE: src/main.jsx
//
// WHY THIS CHANGES FROM ORIGINAL:
//
// 1. AuthProvider wraps the app INSIDE RouterProvider
//    It lives in the root route element (RootLayout in routes.jsx)
//    so it has access to React Router context (needed by child components).
//
// 2. <Toaster> renders toast pop-up notifications.
//    Without it: toast.success() / toast.error() calls are silent — no UI feedback.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import router from "./routes/routes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: "10px",
          background: "#1e293b",
          color: "#f8fafc",
          fontSize: "14px",
        },
        success: { iconTheme: { primary: "#6366f1", secondary: "#fff" } },
        error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
      }}
    />
  </StrictMode>,
);
