import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import connectDB from "./Config/Connection.js";
import UserRouter from "./Routes/User.js"
import SheetRouter from "./Routes/Sheet.js"
import NoteRouter from "./Routes/Note.js"
import GithubRouter from "./Routes/Github.js"
import LeetcodeRouter from "./Routes/Leetcode.js"
import CodeforcesRouter from "./Routes/Codeforces.js"
import GFGRouter from "./Routes/GFG.js"
import AIInterview from "./Routes/interviewRoutes.js"
import { checkAndSendEmails } from "./Controller/Mail.js";
import { authenticateToken } from "./Middlewares/Auth.js";
import { githubData } from "./Controller/Aiagent.js";
import { FetchInternships } from "./Controller/InternshipController.js";
dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MONGODB_URI;
const app = express();
connectDB(URI)

//Middlerwares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
    res.send("OK");
});
app.use("/user", UserRouter);
app.use("/api/sheets", SheetRouter);
app.use("/api/notes", NoteRouter);
app.use("/api/github", GithubRouter);
app.use("/api/leetcode", LeetcodeRouter);
app.use("/api/codeforces", CodeforcesRouter);
app.use("/api/gfg", GFGRouter);
app.use("/api/v1/AiInterview",AIInterview);
app.post("/api/gemini",authenticateToken, githubData);
app.get("/api/intership", FetchInternships);
// checkAndSendEmails()
app.listen(PORT, () => {
    console.log("Server is running on " + PORT);
});
