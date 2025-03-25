import express from "express";
import { getContributions, getStats, getUserProfile } from "../Controller/GithubController.js";

const router = express.Router();

router.get("/:username", getUserProfile);
router.get("/:username/contributions", getContributions);
router.get("/:username/stats", getStats);


export default router;
