// FILE: src/api/notesApi.js
//
// WHY THIS FILE EXISTS:
// Same pattern as authApi.js — separates "how to talk to the backend"
// from "what the UI should show." Notes.jsx only calls these functions;
// it doesn't know or care about HTTP methods or endpoints.
//
// WITHOUT THIS FILE:
//   • Notes.jsx would have 80+ lines of axios code mixed with JSX
//   • Every note operation (create, update, delete) would duplicate the
//     error-handling and request-building logic

import axiosInstance from "./axiosInstance";

// GET /api/notes/
export const fetchNotesApi = async () => {
  const res = await axiosInstance.get("/api/notes/");
  return res.data.notes; // Returns array of note objects
};

// POST /api/notes/create
export const createNoteApi = async ({ title, content, tags }) => {
  const res = await axiosInstance.post("/api/notes/create", {
    title,
    content,
    tags,
  });
  return res.data.note;
};

// POST /api/notes/update
// Note: backend route is /update (no :id param), so we send id in body
export const updateNoteApi = async ({ id, title, content, tags }) => {
  const res = await axiosInstance.post("/api/notes/update", {
    id,
    title,
    content,
    tags,
  });
  return res.data.note;
};

// POST /api/notes/delete
// Same reason — we send id in the request body
export const deleteNoteApi = async (id) => {
  const res = await axiosInstance.post("/api/notes/delete", { id });
  return res.data;
};
