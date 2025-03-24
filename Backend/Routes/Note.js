import express from "express";
import { createGeneralNote, createNote, getQuestionNoteById, getUserNotes, getUserQuestionNotes, handleGetNoteById, handleUpdateNotes, updateGeneralNote } from "../Controller/NotesController.js";
import { authenticateToken } from "../Middlewares/Auth.js";



const router = express.Router();

router.put("/update-note/:noteId",authenticateToken,handleUpdateNotes );
router.get("/note/:noteId",authenticateToken,handleGetNoteById );
router.get("/",authenticateToken,getUserNotes );
router.get("/questionnotes",authenticateToken,getUserQuestionNotes );
router.post("/create",authenticateToken,createGeneralNote );
router.post("/createquestionnote",authenticateToken,createNote );
router.put("/general-notes/:id", updateGeneralNote);
router.get("/:id", getQuestionNoteById);
export default router;
