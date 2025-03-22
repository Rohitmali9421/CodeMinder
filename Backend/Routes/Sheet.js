import express from "express";
import {  handleCreateSheet, handleFollowSheet,  handleGetAllSheets, handleGetSheetById } from "../Controller/SheetController.js";
import { handleMarkQuestionAsSolved } from "../Controller/QuestionController.js";
const router = express.Router();

router.post("/create", handleCreateSheet);
// router.post("/fetch-and-add-questions", handleFetchAndAddQuestions); 
router.post("/follow", handleFollowSheet);
router.post("/mark-solved", handleMarkQuestionAsSolved);
router.get("/", handleGetAllSheets);
router.get("/:id", handleGetSheetById);
export default router;
