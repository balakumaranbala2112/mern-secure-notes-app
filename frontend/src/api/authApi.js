// FILE: src/api/authApi.js
//
// WHY THIS FILE EXISTS:
// This is the "API service layer" — all network calls for auth in one place.
// Components should NOT contain raw axios calls. Instead:
//   Component → calls authApi.login() → authApi talks to backend
//
// WITHOUT THIS FILE:
//   • Login.jsx, Register.jsx would each have raw axios.post(...) inside them
//   • If the endpoint changes, you edit every component
//   • Business logic (building the request body) leaks into UI code
//   • Impossible to test, impossible to reuse

import axiosInstance from "./axiosInstance";

// POST /api/auth/register
export const registerApi = async ({ name, email, password }) => {
  const res = await axiosInstance.post("/api/auth/register", {
    name,
    email,
    password,
  });
  return res.data; // { success: true, user, token }
};

// POST /api/auth/login
export const loginApi = async ({ email, password }) => {
  const res = await axiosInstance.post("/api/auth/login", { email, password });
  return res.data; // { success: true, user, token }
};

// GET /api/auth/logout — clears the cookie on the server
export const logoutApi = async () => {
  const res = await axiosInstance.get("/api/auth/logout");
  return res.data;
};
