// FILE: src/context/AuthContext.jsx
//
// WHY THIS FILE EXISTS:
// Global state for "who is logged in." Any component in the app can call
// useAuth() to get the current user and auth functions.
//
// HOW IT WORKS:
//   1. AuthProvider wraps the app inside the Router (in main.jsx)
//   2. Any component calls useAuth() to get user + auth functions
//   3. When user logs in → user state updates → Navbar re-renders automatically
//
// NAVIGATION PATTERN:
// login/register/logout return results or throw, then the CALLING component
// (Login.jsx, Register.jsx, Navbar.jsx) handles navigation with useNavigate().
// This keeps AuthContext decoupled from routing decisions.

import React, { createContext, useContext, useState } from "react";
import { loginApi, logoutApi, registerApi } from "../api/authApi";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // user = null → not logged in
  // user = { _id, name, email } → logged in
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

  // ── REGISTER ──────────────────────────────────────────────────────────────
  // Returns data on success, throws on failure.
  // Register.jsx catches the result and calls navigate("/notes").
  const register = async (formData) => {
    setAuthLoading(true);
    try {
      const data = await registerApi(formData);
      setUser(data.user);
      toast.success(`Welcome, ${data.user.name}! 🎉`);
      return data;
    } catch (err) {
      const msg = err?.response?.data?.message || "Registration failed";
      toast.error(msg);
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  // ── LOGIN ─────────────────────────────────────────────────────────────────
  const login = async (formData) => {
    setAuthLoading(true);
    try {
      const data = await loginApi(formData);
      setUser(data.user);
      toast.success(`Welcome back, ${data.user.name}!`);
      return data;
    } catch (err) {
      const msg = err?.response?.data?.message || "Login failed";
      toast.error(msg);
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  // ── LOGOUT ────────────────────────────────────────────────────────────────
  const logout = async () => {
    try {
      await logoutApi();
    } catch {
      // Even if API call fails, clear local state
    } finally {
      setUser(null);
      toast.success("Logged out successfully");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, authLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

export default AuthContext;
