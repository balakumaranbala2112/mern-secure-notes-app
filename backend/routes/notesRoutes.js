import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
} from "../controllers/notesController.js";
import { verifyUser } from "../helper/useAuth.js";
const router = express.Router();

router.route("/").get(verifyUser, getAllNotes);
router.route("/create").post(verifyUser, createNote);
router.route("/update").put(verifyUser, updateNote);
router.route("/delete").delete(verifyUser, deleteNote);

export default router;
