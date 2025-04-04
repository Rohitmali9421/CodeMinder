import User from "../Model/User.js";
import { getCodeforcesDataForStructure } from "../utils/Codeforcesdata.js";
import { getGitHubLanguagesAndStats } from "../utils/GitHubdata.js";
import { getLeetCodeStatsTopicsAwards } from "../utils/Leetcodedata.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

 // Use environment variable

const githubData = async (req, res) => {
    try {
        const userId = req.user.id;
        const { question } = req.body; // Extract question from request body

        if (!question) {
            return res.status(400).json({ message: "Question is required in the request body." });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.platforms) {
            return res.status(400).json({ message: "User platforms not found." });
        }

        const { github, leetcode, codeforces } = user.platforms;

        if (!github && !leetcode && !codeforces) {
            return res.status(400).json({ message: "No coding platform data available." });
        }

        const githubData = github ? await getGitHubLanguagesAndStats(github) : null;
        const leetcodeData = leetcode ? await getLeetCodeStatsTopicsAwards(leetcode) : null;
        const codeforcesData = codeforces ? await getCodeforcesDataForStructure(codeforces) : null;

        const combinedData = { github: githubData, leetcode: leetcodeData, codeforces: codeforcesData };

        const geminiResponse = await generateResponse(combinedData, question ,user.name);

        return res.json({  geminiResponse });
    } catch (error) {
        console.error("Error fetching data or generating response:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

async function generateResponse(data, question ,username) {
    const genAI = new GoogleGenerativeAI("AIzaSyCnraFmUmkRO-E6o5e71mBygNsq9cCm7nQ");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
    You are an AI assistant analyzing a user's coding data from GitHub, LeetCode, and Codeforces.
    The user's data is: ${JSON.stringify(data)}
    user name is ${username} this so give response by name
    Answer the following question in five lines    based on the provided data: ${question}
     and dont show my data in responseand  do not tell like Based on the provided data like if question is not realted to data then give generalised answers act like ai agent`;


    try {
        const result = await model.generateContent(prompt);
        const response =  result.response;
        const text = response.text(); // Extract response text correctly
        return text;
    } catch (error) {
        console.error("Error generating Gemini response:", error);
        return "An error occurred while processing your request.";
    }
}

export { githubData };
