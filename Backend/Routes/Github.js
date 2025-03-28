import express from "express";
import {getGitHubUserData } from "../Controller/GithubController.js";

const router = express.Router();

router.get("/:username", getGitHubUserData);



export default router;
