import express from "express";
import {authenticateToken} from "../Middlewares/Auth.js"
import {  handleCreateSheet, handleFetchAndAddQuestions, handleFollowSheet,  handleGetAllSheets, handleGetFollowedSheets, handleGetSheetById } from "../Controller/SheetController.js";
import { handleGetSolvedQuestionsByUser, handleMarkQuestionAsSolved } from "../Controller/QuestionController.js";
const router = express.Router();

router.post("/create", handleCreateSheet);
router.post("/fetch-and-add-questions", handleFetchAndAddQuestions); 
router.post("/follow",authenticateToken, handleFollowSheet);
router.post("/mark-solved",authenticateToken, handleMarkQuestionAsSolved);
router.get("/",authenticateToken, handleGetAllSheets);
router.post("/details",authenticateToken, handleGetSheetById);
router.get("/followed-sheets",authenticateToken, handleGetFollowedSheets);
router.post("/solvedbyuser",authenticateToken, handleGetSolvedQuestionsByUser);
export default router;
