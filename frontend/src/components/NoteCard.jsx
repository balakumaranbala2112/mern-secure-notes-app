// FILE: src/components/NoteCard.jsx
//
// WHY THIS FILE EXISTS:
// A single reusable card that displays one note. Notes.jsx maps over the array
// and renders one NoteCard per note. Separating it means:
//   • Notes.jsx stays clean — just manages data, not UI details
//   • You can change how a card looks in ONE place
//   • The card can have its own hover states, color logic etc.
//
// WITHOUT THIS FILE:
//   • Notes.jsx would have all the card HTML inlined in a .map() —
//     making it 200+ lines of mixed concerns
//
// PROPS:
//   note      — the note object { _id, title, content, tags, createdAt, updatedAt }
//   onEdit    — called when pencil icon clicked → opens edit modal
//   onDelete  — called when trash icon clicked → deletes note

import React from "react";
import { FaEdit, FaTrash, FaTag } from "react-icons/fa";
import formatDate from "../utils/formatDate ";

// Map index to a soft pastel color so each card feels distinct
const CARD_COLORS = [
  "border-indigo-400",
  "border-emerald-400",
  "border-amber-400",
  "border-pink-400",
  "border-sky-400",
  "border-violet-400",
];

const TAG_COLORS = [
  "bg-indigo-100 text-indigo-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",
  "bg-sky-100 text-sky-700",
  "bg-violet-100 text-violet-700",
];

const NoteCard = ({ note, onEdit, onDelete, index = 0 }) => {
  const colorClass = CARD_COLORS[index % CARD_COLORS.length];

  return (
    <div
      className={`group relative bg-white rounded-xl border border-slate-200 border-t-4 ${colorClass} shadow-sm hover:shadow-md transition-all duration-200 flex flex-col`}
    >
      {/* Card Body */}
      <div className="flex flex-col flex-1 gap-3 p-5">
        {/* Title row */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-snug text-slate-800 line-clamp-2">
            {note.title}
          </h3>

          {/* Action buttons — visible on hover */}
          <div className="flex items-center gap-1 transition-opacity opacity-0 group-hover:opacity-100 shrink-0">
            <button
              onClick={() => onEdit(note)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
              title="Edit note"
            >
              <FaEdit className="text-sm" />
            </button>
            <button
              onClick={() => onDelete(note._id)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              title="Delete note"
            >
              <FaTrash className="text-sm" />
            </button>
          </div>
        </div>

        {/* Content preview */}
        <p className="text-sm leading-relaxed text-slate-500 line-clamp-3">
          {note.content}
        </p>

        {/* Tags */}
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
            {note.tags.map((tag, i) => (
              <span
                key={i}
                className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                  TAG_COLORS[i % TAG_COLORS.length]
                }`}
              >
                <FaTag className="text-[10px]" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="px-5 py-3 text-xs border-t border-slate-100 text-slate-400">
        Updated {formatDate(note.updatedAt)}
      </div>
    </div>
  );
};

export default NoteCard;
