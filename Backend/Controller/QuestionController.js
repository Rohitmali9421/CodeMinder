import Notes from "../Model/Notes.js";
import User from "../Model/User.js";

// ----------------------- Mark Question as Solved / Unsolved -----------------------
const handleMarkQuestionAsSolved = async (req, res) => {
  try {
    const { sheetId, questionId } = req.body;
    const userId = req.user.id;

    if (!userId || !sheetId || !questionId) {
      return res.status(400).json({ error: "User ID, Sheet ID, and Question ID are required." });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found." });

    const sheetIndex = user.sheets.findIndex(s => s.sheet_id.toString() === sheetId);
    if (sheetIndex === -1) {
      return res.status(400).json({ error: "You need to follow this sheet first." });
    }

    const solvedQuestions = user.sheets[sheetIndex].solved_questions;
    const existingIndex = solvedQuestions.findIndex(q => q.question_id.toString() === questionId);

    let message;
    if (existingIndex !== -1) {
      // Unmark question
      solvedQuestions.splice(existingIndex, 1);
      message = "Question marked as unsolved successfully.";
    } else {
      // Mark question as solved
      solvedQuestions.push({ question_id: questionId, status: "Completed" });
      message = "Question marked as solved successfully.";
    }

    await user.save();
    const { password, ...userData } = user._doc;

    return res.status(200).json({ message, user: userData });
  } catch (error) {
    console.error("Mark Question Error:", error);
    return res.status(500).json({ error: "Server error. Please try again later." });
  }
};

// ----------------------- Get Solved Questions by User -----------------------
const handleGetSolvedQuestionsByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate({
      path: "sheets.solved_questions.question_id",
      model: "Question",
    });

    if (!user) return res.status(404).json({ success: false, error: "User not found." });

    const solvedQuestions = [];

    for (const sheetProgress of user.sheets) {
      for (const solved of sheetProgress.solved_questions) {
        const question = solved.question_id;
        if (!question) continue;

        const note = await Notes.findOne({ user: userId, question_id: question._id });

        solvedQuestions.push({
          questionId: question._id,
          title: question.title,
          platform: question.platform,
          url: question.url,
          difficulty: question.difficulty,
          topicTags: question.topicTags,
          sheetId: sheetProgress.sheet_id,
          note: note ? note._id : null,
        });
      }
    }

    return res.status(200).json({ success: true, data: solvedQuestions });
  } catch (error) {
    console.error("Get Solved Questions Error:", error);
    return res.status(500).json({ success: false, error: "Server error. Please try again later." });
  }
};

export { handleMarkQuestionAsSolved, handleGetSolvedQuestionsByUser };
