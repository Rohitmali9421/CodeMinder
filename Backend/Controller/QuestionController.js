import User from "../Model/User.js";
import Note from "../Model/Notes.js";
import mongoose from "mongoose";
import Notes from "../Model/Notes.js";

const handleMarkQuestionAsSolved = async (req, res) => {
  try {
    const { userId, sheetId, questionId, notesContent } = req.body;

    if (!userId || !sheetId || !questionId) {
      return res.status(400).json({ error: "User ID, Sheet ID, and Question ID are required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Find the sheet in user's followed sheets
    const sheetIndex = user.sheets.findIndex((s) => s.sheet_id.toString() === sheetId);
    if (sheetIndex === -1) {
      return res.status(400).json({ error: "You need to follow this sheet first" });
    }

    let solvedQuestions = user.sheets[sheetIndex].solved_questions;

    // Check if the question is already marked as solved
    const existingQuestion = solvedQuestions.find((q) => q.question_id.toString() === questionId);

    let notesId = null;

    // If notesContent is provided, create a new Note and save it
    if (notesContent) {
      const newNote = new Note({
        user: userId,
        question_id: questionId,
        content: notesContent,
      });
      await newNote.save();
      notesId = newNote._id;
    }

    if (existingQuestion) {
      // If question exists but has no notes, update it with new notes if provided
      if (!existingQuestion.notes_id && notesId) {
        existingQuestion.notes_id = notesId;
        await user.save();
        return res.status(200).json({
          message: "Notes added successfully to the solved question",
          user,
        });
      }
      return res.status(400).json({ error: "This question is already marked as solved" });
    }

    // Add the solved question to the sheet
    user.sheets[sheetIndex].solved_questions.push({
      question_id: questionId,
      notes_id: notesId, // Adds newly created note ID if available, otherwise null
      status: "Completed",
    });

    await user.save();
    const { password: _, ...userWithoutPassword } = user._doc;
    return res.status(200).json({
      message: "Question marked as solved successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error marking question as solved:", error);
    return res.status(500).json({ error: "Server error. Please try again later." });
  }
};

export { handleMarkQuestionAsSolved };
