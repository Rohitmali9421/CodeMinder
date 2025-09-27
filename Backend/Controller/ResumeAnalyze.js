import pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { jsonrepair } from "jsonrepair";
import Resume from "../Model/Resume.js";

dotenv.config();

// Disable worker for Node.js
pdfjsLib.GlobalWorkerOptions.workerSrc = null;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Extract text from a PDF buffer
 */
const extractPdfText = async (buffer) => {
  const loadingTask = pdfjsLib.getDocument({ data: buffer });
  const pdf = await loadingTask.promise;

  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(" ");
    text += pageText + "\n\n";
  }

  return text.trim();
};

/**
 * Parse resume text into structured JSON and store in DB
 */
const parseAndStoreResume = async (userId, resumeText) => {
  const prompt = `
You are a resume parser. Analyze the following resume text and return all available information in structured JSON format.

Include standard sections:
- name
- email
- phone
- location
- summary
- skills
- experience (jobTitle, company, startDate, endDate, description)
- education (degree, institution, startDate, endDate)
- certifications
- projects

Also include any other sections found (languages, awards, volunteer work, publications, interests, etc.).

Return only valid JSON.
Resume Text:
${resumeText}
`;

  try {
    const result = await model.generateContent(prompt);
    let responseText = result.response.text();

    if (responseText.startsWith("```json")) {
      responseText = responseText.replace(/^```json\s*/, "").replace(/```$/, "");
    }

    let parsed;
    try {
      parsed = JSON.parse(responseText);
    } catch {
      parsed = JSON.parse(jsonrepair(responseText));
    }

    return await Resume.findOneAndUpdate(
      { userId },
      { data: parsed, createdAt: new Date() },
      { new: true, upsert: true }
    );
  } catch (error) {
    console.error("Resume parsing error:", error.message);
    throw new Error("Failed to extract structured resume data");
  }
};

/**
 * Evaluate resume suitability for a job category
 */
const evaluateResume = async (resumeText, category) => {
  const prompt = `
You are an expert resume evaluator. Given the following resume text, analyze suitability for the role: "${category}".

Return only valid JSON in this format:
{
  "matchPercentage": 0-100,
  "missingKeywords": [],
  "strengths": [],
  "suggestions": [],
  "summary": "short paragraph"
}

Resume Text:
${resumeText}
`;

  try {
    const result = await model.generateContent(prompt);
    let responseText = result.response.text();

    if (responseText.startsWith("```json")) {
      responseText = responseText.replace(/^```json\s*/, "").replace(/```$/, "");
    }

    let parsed;
    try {
      parsed = JSON.parse(responseText);
    } catch {
      parsed = JSON.parse(jsonrepair(responseText));
    }

    return parsed;
  } catch (error) {
    console.error("Resume evaluation error:", error.message);
    throw new Error("Failed to evaluate resume");
  }
};

/**
 * API handler to upload & analyze PDF resume
 */
const handleAnalyzePdf = async (req, res) => {
  try {
    if (!req.file?.buffer) {
      return res.status(400).json({ error: "No PDF file uploaded" });
    }

    const { category } = req.body;
    if (!category) {
      return res.status(400).json({ error: "Job category is required" });
    }

    const userId = req.user.id;

    // Extract text
    const resumeText = await extractPdfText(req.file.buffer);

    // Parse + store structured data
    await parseAndStoreResume(userId, resumeText);

    // Evaluate against job category
    const evaluation = await evaluateResume(resumeText, category);

    return res.status(200).json({
      success: true,
      category,
      evaluation,
    });
  } catch (error) {
    console.error("Resume analysis error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to analyze resume",
      details: error.message,
    });
  }
};

export { handleAnalyzePdf };
