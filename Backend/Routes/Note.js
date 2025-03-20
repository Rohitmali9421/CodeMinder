import express from "express";
import { handleUpdateNotes } from "../Controller/NotesController.js";
import { handleGetNoteById } from "../Controller/QuestionController.js";


const router = express.Router();

router.put("/update-note/:noteId",handleUpdateNotes );
router.get("/note/:noteId/user/:userId",handleGetNoteById );

export default router;
