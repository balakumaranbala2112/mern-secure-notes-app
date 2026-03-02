// FILE: src/pages/Notes.jsx
//
// WHY THIS FILE EXISTS:
// The main dashboard — shows all the user's notes and lets them:
//   • View all notes fetched from MongoDB
//   • Create a new note (opens modal)
//   • Edit an existing note (opens modal pre-filled)
//   • Delete a note (with confirmation)
//   • Search/filter notes by title or content
//
// HOW DATA FLOWS:
//   1. Component mounts → fetchNotes() calls backend GET /api/notes/
//   2. Backend verifies JWT cookie → returns user's notes
//   3. Notes stored in local state → rendered as NoteCard grid
//   4. Create/Edit → POST to backend → update local state (no full re-fetch needed)
//   5. Delete → POST to backend → remove from local state

import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaStickyNote } from "react-icons/fa";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NoteModal from "../components/NoteModal";
import {
  fetchNotesApi,
  createNoteApi,
  updateNoteApi,
  deleteNoteApi,
} from "../api/notesApi";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editNote, setEditNote] = useState(null); // null = create mode
  const [submitting, setSubmitting] = useState(false);

  // ── FETCH ALL NOTES ON MOUNT ─────────────────────────────────────────────────
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const data = await fetchNotesApi();
      setNotes(data);
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to load notes";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // ── OPEN MODAL ───────────────────────────────────────────────────────────────
  const openCreateModal = () => {
    setEditNote(null); // null = create mode
    setModalOpen(true);
  };

  const openEditModal = (note) => {
    setEditNote(note); // pre-fills form
    setModalOpen(true);
  };

  // ── SUBMIT (CREATE OR UPDATE) ─────────────────────────────────────────────────
  const handleModalSubmit = async (formData) => {
    setSubmitting(true);
    try {
      if (editNote) {
        // UPDATE — send id along with the new data
        const updated = await updateNoteApi({ id: editNote._id, ...formData });
        setNotes((prev) =>
          prev.map((n) => (n._id === updated._id ? updated : n)),
        );
        toast.success("Note updated!");
      } else {
        // CREATE — add new note to front of list
        const created = await createNoteApi(formData);
        setNotes((prev) => [created, ...prev]);
        toast.success("Note created!");
      }
      setModalOpen(false);
      setEditNote(null);
    } catch (err) {
      const msg = err?.response?.data?.message || "Something went wrong";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // ── DELETE ───────────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note? This cannot be undone.")) return;
    try {
      await deleteNoteApi(id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      toast.success("Note deleted");
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to delete note";
      toast.error(msg);
    }
  };

  // ── SEARCH FILTER ─────────────────────────────────────────────────────────────
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase()) ||
      note.tags?.some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase()),
      ),
  );

  // ── RENDER ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl px-6 py-8 mx-auto">
        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 mb-8 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">My Notes</h1>
            <p className="text-slate-500 text-sm mt-0.5">
              {notes.length} {notes.length === 1 ? "note" : "notes"} total
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium text-sm hover:bg-indigo-700 active:scale-95 transition-all shadow-sm"
          >
            <FaPlus className="text-xs" />
            New Note
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <FaSearch className="absolute text-sm -translate-y-1/2 left-4 top-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes by title, content, or tag..."
            className="w-full py-3 pr-4 text-sm transition bg-white border shadow-sm pl-11 rounded-xl border-slate-200 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 rounded-full border-indigo-600/20 border-t-indigo-600 animate-spin" />
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredNotes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-indigo-50">
              <FaStickyNote className="text-2xl text-indigo-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700">
              {search ? "No matching notes" : "No notes yet"}
            </h3>
            <p className="mt-1 mb-5 text-sm text-slate-400">
              {search
                ? "Try a different search term"
                : "Create your first note to get started"}
            </p>
            {!search && (
              <button
                onClick={openCreateModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium text-sm hover:bg-indigo-700 transition-colors"
              >
                <FaPlus className="text-xs" /> Create Note
              </button>
            )}
          </div>
        )}

        {/* Notes Grid */}
        {!loading && filteredNotes.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredNotes.map((note, index) => (
              <NoteCard
                key={note._id}
                note={note}
                index={index}
                onEdit={openEditModal}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <NoteModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditNote(null);
        }}
        onSubmit={handleModalSubmit}
        editNote={editNote}
        isLoading={submitting}
      />
    </div>
  );
};

export default Notes;
