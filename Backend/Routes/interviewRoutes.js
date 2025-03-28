import express from "express";

import { createInterview, getInterviewById, getUserInterviews, storeUserAnswer } from "../Controller/interviewController.js";
import { authenticateToken } from "../Middlewares/Auth.js";

const router = express.Router();

router.post("/create", authenticateToken, createInterview);
router.get("/get/:interviewId", authenticateToken, getInterviewById);
router.get("/getUserInterviews",authenticateToken,getUserInterviews);
router.post("/:interviewId/submitAns", authenticateToken, storeUserAnswer);



export default router;
