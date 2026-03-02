import Notes from "../models/Notes.js";

// GET /api/notes/
// Returns all notes belonging to the logged-in user
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id }).sort({
      createdAt: -1, // Newest first
    });
    res.status(200).json({ success: true, notes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/notes/create
export const createNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }
    const note = await Notes.create({
      title,
      content,
      tags: tags || [],
      user: req.user.id,
    });
    res.status(201).json({ success: true, note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/notes/update
// BUG FIX: Original used req.params.id but the route is /update with no :id param.
// req.params.id would always be undefined. We use req.body.id instead.
export const updateNote = async (req, res) => {
  try {
    const { id, title, content, tags } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Note ID is required" });
    }

    const note = await Notes.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Make sure the note belongs to the logged-in user
    if (note.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updated = await Notes.findByIdAndUpdate(
      id,
      { title, content, tags },
      { new: true, runValidators: true },
    );

    res.status(200).json({ success: true, note: updated });
  } catch (error) {
    // BUG FIX: Original had empty catch {} — errors silently disappeared.
    // Now we return a proper error so you can debug in the frontend.
    res.status(500).json({ message: error.message });
  }
};

// POST /api/notes/delete
// BUG FIX 1: req.params.id → req.body.id (same reason as updateNote)
// BUG FIX 2: res.status(___).json({ message: "______" }) was a placeholder
//            that causes a SYNTAX ERROR — the app won't even start.
// BUG FIX 3: No try/catch — any DB error would crash the whole process.
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Note ID is required" });
    }

    const note = await Notes.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    await Notes.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
