// FILE: src/components/Navbar.jsx
//
// WHY THIS FILE EXISTS:
// Global top navigation shown on every page (via MainLayout).
// Reads auth state from AuthContext to show:
//   • Logged-in: user's name + Logout button
//   • Logged-out: Login / Register links
//
// BUG FIXED: was `const isAuthenticated = true` (hardcoded!)
// That meant the logout button never showed, register link always hidden.

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaMoon,
  FaSun,
  FaNotesMedical,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    setDark((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b shadow-sm border-slate-200 bg-white/80 backdrop-blur-sm">
      <nav className="flex items-center justify-between max-w-6xl px-6 py-3 mx-auto">
        {/* Logo */}
        <Link
          to={user ? "/notes" : "/login"}
          className="flex items-center gap-2"
        >
          <span className="flex items-center justify-center w-8 h-8 text-sm text-white bg-indigo-600 rounded-lg">
            <FaNotesMedical />
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-800">
            NoteVault
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDark}
            className="p-2 transition-colors rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            title="Toggle dark mode"
          >
            {dark ? <FaSun className="text-amber-400" /> : <FaMoon />}
          </button>

          {user ? (
            // ── LOGGED IN STATE ─────────────────────────────────
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700">
                <FaUser className="text-xs" />
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <button
                onClick={async () => {
                  await logout();
                  navigate("/login");
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 transition-colors rounded-lg bg-red-50 hover:bg-red-100"
              >
                <FaSignOutAlt className="text-xs" />
                Logout
              </button>
            </div>
          ) : (
            // ── LOGGED OUT STATE ────────────────────────────────
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium transition-colors text-slate-600 hover:text-indigo-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
