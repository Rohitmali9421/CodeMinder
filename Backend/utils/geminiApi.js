
import { GoogleGenerativeAI } from '@google/generative-ai'
const GEMINI_API = process.env.GEMINI_API_KEY


export const generateQuestions = async (jobRole, jobDescription, experienceLevel) => {
  const genAI = new GoogleGenerativeAI(GEMINI_API);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Act as a senior ${jobRole}. Generate 7-15 technical and behavioral interview questions based on ${jobDescription}  for an ${experienceLevel}-level of experience have that candidate. Format the output strictly as a JSON object with a "questions" key containing an array of objects, where each object has a "question" and "answer" field. Do not include any markdown formatting or additional text`

  const result = await model.generateContent(prompt);
  let responseText = result.response.text().trim(); 

  if (responseText.startsWith("```json")) {
    responseText = responseText.replace(/```json/, "").replace(/```/, "").trim();
  }

  try {
    const jsonData = JSON.parse(responseText); 
    return jsonData.questions;
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }


};  
