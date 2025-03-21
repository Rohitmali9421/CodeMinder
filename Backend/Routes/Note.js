import express from "express";
import { handleGetNoteById, handleUpdateNotes } from "../Controller/NotesController.js";



const router = express.Router();

router.put("/update-note/:noteId",handleUpdateNotes );
router.get("/note/:noteId/user/:userId",handleGetNoteById );

export default router;
