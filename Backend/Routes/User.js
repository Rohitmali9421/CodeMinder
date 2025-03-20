import express from "express";
import { handleLogin, handleSignUp } from "../Controller/UserController.js";
const router = express.Router();

router.post("/signUp", handleSignUp);
router.post("/login", handleLogin);

export default router;
