import express from "express";
import { handleGetUser, handleLogin, handleSignUp } from "../Controller/UserController.js";
const router = express.Router();

router.post("/signup", handleSignUp);
router.post("/login", handleLogin);
router.get("/", handleGetUser);

export default router;
