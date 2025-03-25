import express from "express";
import { getAllLeetCodeData } from "../Controller/LeetcodeController.js";


const router = express.Router();

router.get("/:username", getAllLeetCodeData);




export default router;
