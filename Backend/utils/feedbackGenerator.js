import { GoogleGenerativeAI } from '@google/generative-ai'
const GEMINI_API = process.env.GEMINI_API_KEY
export const generateAIAnalysis = async (question, aiAnswer, userAnswer) => {

  const genAI = new GoogleGenerativeAI(GEMINI_API);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Compare the correct answer: "${aiAnswer}" with the user's answer: "${userAnswer}". 
  Provide structured feedback in 2-3 sentences and a score out of 10.
  Response format: { "feedback": "...", "score": "..." }`;

  try {
    const result = await model.generateContent(prompt);
    let responseText = result.response.text().trim(); 

    if (responseText.startsWith("```json")) {
      responseText = responseText.replace(/```json/, "").replace(/```/, "").trim();
    }
    return JSON.parse(responseText);
  } catch (error) {
    console.error("Error generating AI feedback:", error);
    return { feedback: "AI feedback failed.", score: 0 };
  }
};


