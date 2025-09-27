import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Models
import User from "../Model/User.js";
import GitHubData from "../Model/GitHubData.js";
import LeetCodeData from "../Model/LeetCodeData.js";
import CodeforcesData from "../Model/CodeforcesData.js";
import Resume from "../Model/Resume.js";

dotenv.config();

/**
 * Controller: Generate AI Response
 */
const generateAIResponse = async (req, res) => {
  try {
    const userId = req.user.id;
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question is required." });
    }

    // Fetch user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    // Fetch user-related data
    const resumeData = await Resume.findOne({ userId });
    const githubData = await GitHubData.findOne({ userId });
    const leetcodeData = await LeetCodeData.findOne({ userId });
    const codeforcesData = await CodeforcesData.findOne({ userId });

    // Combine all data
    const combinedData = {
      github: githubData?.data || null,
      leetcode: leetcodeData
        ? {
            stats: leetcodeData.stats,
            submissionCalendar: leetcodeData.submissionCalendar,
            topicAnalysisStats: leetcodeData.topicAnalysisStats,
            awards: leetcodeData.awards,
          }
        : null,
      codeforces: codeforcesData?.data || null,
    };

    // Get AI response
    const aiResponse = await generateGeminiResponse(
      combinedData,
      resumeData,
      question,
      user.name
    );

    return res.status(200).json({ aiResponse });
  } catch (error) {
    console.error("Error generating AI response:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * Helper: Generate Response from Gemini
 */
const generateGeminiResponse = async (data, resumeData, question, username) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  // Prompt design
  const prompt = `
You are an AI assistant analyzing a user's coding profile.

User's name: ${username}

Here is the user's stored coding data (do not mention it explicitly):
${JSON.stringify(data)}

Here is the user's resume data (do not mention it explicitly):
${JSON.stringify(resumeData)}

Answer this question in a maximum of 5 lines: "${question}"

Instructions:
- Address the user by name.
- Do NOT say "Based on the data".
- Do NOT say "according to your resume" or similar phrases.
- If the question is unrelated, still give a relevant or general answer.
`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    return "An error occurred while generating the AI response.";
  }
};

export { generateAIResponse };
