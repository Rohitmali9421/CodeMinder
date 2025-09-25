import express from "express";
import {
  createNote,
  updateNote,
  getGeneralNotes,
  getQuestionNotes,
  getNoteById,
  deleteNote,
} from "../Controller/NotesController.js";
import { authenticateToken } from "../Middlewares/Auth.js";

const router = express.Router();

// Create a note (general or question)
router.post("/create", authenticateToken, createNote);

// Update a note
router.put("/update", authenticateToken, updateNote);

// Get all general notes of the user
router.get("/general", authenticateToken, getGeneralNotes);

// Get all question-specific notes of the user
router.get("/question", authenticateToken, getQuestionNotes);

// Get a note by its ID (general or question)
router.get("/:noteId", authenticateToken, getNoteById);

// Delete a note by its ID
router.delete("/:noteId", authenticateToken, deleteNote);

export default router;
