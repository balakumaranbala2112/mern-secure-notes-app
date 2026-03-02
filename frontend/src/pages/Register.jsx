// FILE: src/pages/Register.jsx
//
// WHY THIS FILE EXISTS:
// New user onboarding. Collects name + email + password, calls register()
// from AuthContext, which hits POST /api/auth/register.
// On success: JWT cookie is set, user redirected to /notes automatically.
//
// BUG FIXED: Original had no state, no handlers — the button said "Login"
// instead of "Register", and submitting the form did nothing.

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaNotesMedical,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register, authLoading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    if (password.length < 8) return;
    try {
      await register({ name, email, password });
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
              Start capturing your ideas today
            </p>
          </div>

          {/* Form body */}
          <div className="px-8 py-7">
            <h2 className="mb-1 text-xl font-semibold text-slate-800">
              Create an account
            </h2>
            <p className="mb-6 text-sm text-slate-500">
              Free forever — no credit card required
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-slate-700"
                >
                  Full Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  />
                </div>
              </div>

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
                    minLength={8}
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
                {password && password.length < 8 && (
                  <p className="text-xs text-red-500">
                    Password must be at least 8 characters
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={authLoading || !name || !email || password.length < 8}
                className="flex items-center justify-center w-full py-3 mt-1 text-sm font-semibold text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {authLoading ? (
                  <span className="w-5 h-5 border-2 rounded-full border-white/30 border-t-white animate-spin" />
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Login redirect */}
            <p className="mt-5 text-sm text-center text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
