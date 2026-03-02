// FILE: src/components/ProtectedRoute.jsx
//
// WHY THIS FILE EXISTS:
// Some pages (Notes) should ONLY be accessible to logged-in users.
// This component sits between the router and the actual page — it checks
// if a user is logged in and either renders the page OR redirects to /login.
//
// WITHOUT THIS FILE:
//   • Anyone can type /notes in the browser and see the notes page
//   • API calls would fail with 401 (no token), showing ugly blank screens
//   • No security on the frontend at all
//
// HOW IT WORKS IN routes.jsx:
//   { path: "notes", element: <ProtectedRoute><Notes /></ProtectedRoute> }
//   → If user is logged in → renders <Notes />
//   → If user is null     → redirects to /login

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // If no user in context → not logged in → send to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User is logged in → render the actual page
  return children;
};

export default ProtectedRoute;
