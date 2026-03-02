// FILE: src/pages/Login.jsx
//
// WHY THIS FILE EXISTS:
// Authentication entry point. Lets a user enter email + password, calls
// the login function from AuthContext, which:
//   1. Hits POST /api/auth/login on the backend
//   2. Backend validates and sets a JWT cookie
//   3. AuthContext stores user data in state
//   4. User is redirected to /notes
//
// BUG FIXED: Original had no useState, no event handlers, the form did NOTHING.
// Clicking "Login" just refreshed the page (default HTML form behavior).

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaNotesMedical,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login, authLoading } = useAuth();

  // Controlled inputs — every keystroke updates state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    try {
      await login({ email, password });
      navigate("/notes");
    } catch {
      // Error toast already shown in AuthContext
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-indigo-50 via-white to-slate-50">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="overflow-hidden bg-white border shadow-xl rounded-2xl border-slate-100">
          {/* Top banner */}
          <div className="px-8 py-6 text-center bg-indigo-600">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-3 rounded-xl bg-white/20">
              <FaNotesMedical className="text-xl text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">NoteVault</h1>
            <p className="mt-1 text-sm text-indigo-200">
              Your ideas, always safe and organized
            </p>
          </div>

          {/* Form body */}
          <div className="px-8 py-7">
            <h2 className="mb-1 text-xl font-semibold text-slate-800">
              Welcome back
            </h2>
            <p className="mb-6 text-sm text-slate-500">
              Sign in to continue to your notes
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700"
                >
                  Email
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    required
                    className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute -translate-y-1/2 right-3 top-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={authLoading || !email || !password}
                className="flex items-center justify-center w-full py-3 mt-1 text-sm font-semibold text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {authLoading ? (
                  <span className="w-5 h-5 border-2 rounded-full border-white/30 border-t-white animate-spin" />
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Register redirect */}
            <p className="mt-5 text-sm text-center text-slate-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:underline"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
