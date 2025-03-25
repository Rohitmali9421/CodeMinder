import express from "express";
import { getAllCodeforcesData } from "../Controller/CodeforcesController.js";

const router = express.Router();

router.get("/:username", getAllCodeforcesData);

export default router;
