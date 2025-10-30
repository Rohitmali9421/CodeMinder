// Interview Controller

import Interview from "../Model/Interview.js";
import { generateAIAnalysis } from "../utils/feedbackGenerator.js";
import { generateQuestions } from "../utils/geminiApi.js";

// Create an Interview & Store AI-Generated Questions
export const createInterview = async (req, res) => {
  try {
    const { jobRole, jobDescription, experienceLevel } = req.body;
    const userId = req.user.id;

    if (!jobRole || !jobDescription || !experienceLevel) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Step 1: Call Gemini API to Generate Questions
    const questions = await generateQuestions(jobRole, jobDescription, experienceLevel);

    const formattedQuestions = questions.map((q) => ({
      questionText: q.question,
      aiAnswer: q.answer,
      userAnswer: null,
      aiFeedback: null,
      score: 0,
    }));

    const newInterview = new Interview({
      userId,
      jobRole,
      jobDescription,
      experienceLevel,
      questions: formattedQuestions,
    });

    await newInterview.save();

    res.status(201).json({
      message: "Interview created successfully",
      interviewId: newInterview._id,
      interview: newInterview,
    });
  } catch (error) {
    console.error("Error creating interview:", error);
    res.status(500).json({ error: "Failed to create interview" });
  }
};

// Get Interview by ID
export const getInterviewById = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const interview = await Interview.findById(interviewId);

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    res.json(interview);
  } catch (error) {
    console.error("Error fetching interview:", error);
    res.status(500).json({ error: "Failed to fetch interview" });
  }
};

// Store User Answer & Generate Feedback
export const storeUserAnswer = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const { questionId, userAnswer } = req.body;

    if (!userAnswer?.trim()) {
      return res.status(400).json({ message: "User answer is required" });
    }

    const interview = await Interview.findById(interviewId);
    if (!interview) return res.status(404).json({ message: "Interview not found" });

    const question = interview.questions.find((q) => q._id.toString() === questionId);
    if (!question) return res.status(404).json({ message: "Question not found" });

    question.userAnswer = userAnswer;

    const { feedback, score } = await generateAIAnalysis(
      question.questionText,
      question.aiAnswer,
      userAnswer
    );
    // console.log(feedback ,score)
    question.aiFeedback = feedback;
    question.score = score;

    // Update final score
    const totalScore = interview.questions.reduce((sum, q) => sum + (q.score || 0), 0);
    const answeredQuestions = interview.questions.filter((q) => q.userAnswer).length;

    interview.finalScore = answeredQuestions > 0 ? (totalScore / answeredQuestions).toFixed(2) : 0;

    await interview.save();

    res.json({ message: "Answer saved successfully", feedback, score, finalScore: interview.finalScore });
  } catch (error) {
    console.error("Error storing user answer:", error);
    res.status(500).json({ error: "Failed to store answer" });
  }
};

// Store Confidence & Eye Contact Metrics
export const handleStoreConfidence = async (req, res) => {
  try {
    const { confidence, eyecontact, interviewId } = req.body;

    const interview = await Interview.findById(interviewId);
    if (!interview) return res.status(404).json({ message: "Interview not found" });

    interview.confidence = confidence ?? interview.confidence;
    interview.eyecontact = eyecontact ?? interview.eyecontact;

    await interview.save();

    res.json({ message: "Metrics updated successfully", interview });
  } catch (error) {
    console.error("Error storing metrics:", error);
    res.status(500).json({ error: "Failed to update metrics" });
  }
};

// Get All Interviews for a User
export const getUserInterviews = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const interviews = await Interview.find({ userId }).sort({ createdAt: -1 });

    if (!interviews.length) {
      return res.status(404).json({ message: "No interviews found" });
    }

    res.json(interviews);
  } catch (error) {
    console.error("Error fetching user interviews:", error);
    res.status(500).json({ error: "Failed to fetch interviews" });
  }
};

// Delete Interview by ID
export const deleteInterviewById = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const userId = req.user.id;

    const interview = await Interview.findOneAndDelete({ _id: interviewId, userId });

    if (!interview) {
      return res.status(404).json({ message: "Interview not found or unauthorized" });
    }

    res.json({ message: "Interview deleted successfully" });
  } catch (error) {
    console.error("Error deleting interview:", error);
    res.status(500).json({ error: "Failed to delete interview" });
  }
};
