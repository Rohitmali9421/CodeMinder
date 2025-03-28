import express from "express";
import { getGFGHeatmap } from "../Controller/GFGController.js";


const router = express.Router();

router.get("/:username", getGFGHeatmap);

export default router;
