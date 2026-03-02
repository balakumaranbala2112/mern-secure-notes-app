// FILE: src/api/axiosInstance.js
//
// WHY THIS FILE EXISTS:
// Instead of writing axios.get("http://localhost:3500/api/notes") everywhere,
// we create ONE configured instance. Every API file imports this and gets:
//   ✅ Correct base URL from .env automatically
//   ✅ withCredentials: true so cookies (JWT) are sent with EVERY request
//
// WITHOUT THIS FILE:
//   • You'd have to write the full URL in every component
//   • You'd forget withCredentials somewhere and auth would randomly break
//   • Changing the backend URL means editing 20+ files

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Sends the JWT cookie with every request
});

export default axiosInstance;
