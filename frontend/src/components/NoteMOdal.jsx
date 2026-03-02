// FILE: src/components/NoteModal.jsx
//
// WHY THIS FILE EXISTS:
// This is the form UI for BOTH creating a new note AND editing an existing one.
// It's a modal (overlay) that slides in over the notes page.
//
// WITHOUT THIS FILE:
//   • Users can see notes but have NO WAY to create or edit them
//   • The create/edit form being in a modal (vs a separate page) means
//     users never lose context of their notes list
//
// PROPS:
//   isOpen      — boolean, controls visibility
//   onClose     — function to close modal
//   onSubmit    — function(formData) called on form submit
//   editNote    — if set, pre-fills the form (edit mode); null = create mode
//   isLoading   — shows loading spinner on submit button

import React, { useState, useEffect } from "react";
import { FaTimes, FaPlus, FaSave } from "react-icons/fa";

const NoteModal = ({ isOpen, onClose, onSubmit, editNote, isLoading }) => {
  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState(""); // Raw string e.g. "react, node, css"

  // When editNote changes (user clicks edit on a different note),
  // pre-fill the form fields with that note's data
  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title);
      setContent(editNote.content);
      setTagsInput(editNote.tags?.join(", ") || "");
    } else {
      // Reset form for create mode
      setTitle("");
      setContent("");
      setTagsInput("");
    }
  }, [editNote, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    // Convert "react, node, css" → ["react", "node", "css"]
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    onSubmit({ title: title.trim(), content: content.trim(), tags });
  };

  // Close modal on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    // Backdrop
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
    >
      {/* Modal Panel */}
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl animate-in">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800">
            {editNote ? "✏️ Edit Note" : "📝 New Note"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 transition-colors rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <FaTimes />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your note a title..."
              required
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">
              Content <span className="text-red-400">*</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note here..."
              required
              rows={5}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">
              Tags{" "}
              <span className="font-normal text-slate-400">
                (comma separated)
              </span>
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="react, mongodb, backend..."
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !title.trim() || !content.trim()}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin" />
              ) : editNote ? (
                <>
                  <FaSave className="text-xs" /> Save Changes
                </>
              ) : (
                <>
                  <FaPlus className="text-xs" /> Create Note
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
