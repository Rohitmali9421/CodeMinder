import express from "express";
import { handleAnalyzePdf } from "../Controller/ResumeAnalyze.js";
import uploadMiddleware from "../Middlewares/Multer.js";
import { authenticateToken } from "../Middlewares/Auth.js";

const router = express.Router();

router.post("/analyze",authenticateToken,uploadMiddleware, handleAnalyzePdf);


export default router;
