import express from "express";
import { handleGetUser, handleLogin, handleSignUp } from "../Controller/UserController.js";
import { authenticateToken } from "../Middlewares/Auth.js";
const router = express.Router();

router.post("/signup", handleSignUp);
router.post("/login", handleLogin);
router.get("/",authenticateToken, handleGetUser);

export default router;
