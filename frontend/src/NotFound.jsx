// FILE: src/NotFound.jsx
// Shown by React Router's errorElement when a URL doesn't match any route.
// Without this: users see a blank white page or a React error stack trace.

import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-slate-50">
      <div className="text-center">
        <p className="font-black text-indigo-100 text-8xl">404</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-800">
          Page not found
        </h1>
        <p className="mt-2 mb-6 text-slate-500">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/login"
          className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium text-sm hover:bg-indigo-700 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
