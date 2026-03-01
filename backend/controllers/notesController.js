import Notes from "../models/Notes.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.status(200).json({ success: true, notes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleNote = async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json({ success: true, note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
      tags,
      user: req.user.id,
    });
    res.status(201).json({ success: true, note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updated = await Notes.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, note: updated });
  } catch (error) {}
};

export const deleteNote = async (req, res) => {
  const note = await Notes.findById(req.params.id);

  if (!note) {
    return res.status(404).json({ message: "Notes Not Found" });
  }

  if (note.user.toString() !== req.user.id) {
    return res.status(403).json({ message: "Access denied" });
  }

  await Notes.findByIdAndDelete(req.params.id);
  res.status(___).json({ success: true, message: "______" });
};
