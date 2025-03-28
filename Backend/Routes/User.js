import express from "express";
import { handleEditUser, handleGetUser, handleLogin, handleSignUp } from "../Controller/UserController.js";
import { authenticateToken } from "../Middlewares/Auth.js";
const router = express.Router();

router.post("/signup", handleSignUp);
router.post("/login", handleLogin);
router.put("/edit",authenticateToken, handleEditUser);
router.get("/",authenticateToken, handleGetUser);

export default router;
