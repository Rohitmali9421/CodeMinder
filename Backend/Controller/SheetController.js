import Sheet from "../Model/Sheet.js";
import User from "../Model/User.js";
import axios from "axios";
import Question from "../Model/Question.js";
import Notes from "../Model/Notes.js";

// **********************Create Sheet**************************
const handleCreateSheet = async (req, res) => {
  try {
    const { title, description, author } = req.body;

    // Validate required fields
    if (!title || !author) {
      return res.status(400).json({ error: "Title and Author are required" });
    }
    // Check if the author exists
    const user = await User.findById(author);
    if (!user) {
      return res.status(404).json({ error: "Author not found" });
    }

    // Create a new sheet
    const newSheet = await Sheet.create({
      title,
      description,
      author,
    });

    return res.status(201).json({
      message: "Sheet created successfully",
      sheet: newSheet,
    });
  } catch (error) {
    console.error("Error creating sheet:", error);
    return res
      .status(500)
      .json({ error: "Server error. Please try again later." });
  }
};

const handleFetchAndAddQuestions = async (req, res) => {
    try {
      const { sheetId } = req.body;

      if (!sheetId ) {
        return res.status(400).json({ error: "Sheet ID and API URL are required" });
      }

      const response = await axios.get("https://node.codolio.com/api/question-tracker/v1/sheet/public/get-sheet-by-slug/strivers-a2z-dsa-sheet");
      const questionsData = response.data.data.questions;

      if (!Array.isArray(questionsData)) {
        return res.status(400).json({ error: "Invalid API response format" });
      }

      const sheet = await Sheet.findById(sheetId);
      if (!sheet) {
        return res.status(404).json({ error: "Sheet not found" });
      }

      const questionIds = [];

      for (const item of questionsData) {
        const questionData = item.questionId;

        let existingQuestion = await Question.findOne({ title: questionData.name });

        if (!existingQuestion) {
          existingQuestion = await Question.create({
            title: questionData.name,
            platform: questionData.platform,
            url: questionData.problemUrl,
            difficulty: questionData.difficulty,
            topic: item.topic,
            topicTags: questionData.topics,
          });
        }

        if (!sheet.questions.includes(existingQuestion._id)) {
          questionIds.push(existingQuestion._id);
        }
      }

      if (questionIds.length === 0) {
        return res.status(400).json({ error: "All questions already exist in the sheet" });
      }

      sheet.questions.push(...questionIds);
      await sheet.save();

      return res.status(200).json({
        message: "Questions added successfully",
        sheet,
      });
    } catch (error) {
      console.error("Error fetching and adding questions:", error);
      return res.status(500).json({ error: "Server error. Please try again later." });
    }
  };

// **********************Follow Sheet**************************
const handleFollowSheet = async (req, res) => {
  try {
    const { sheetId } = req.body;
    const userId = req.user.id;
    if (!userId || !sheetId) {
      return res
        .status(400)
        .json({ error: "User ID and Sheet ID are required" });
    }

    const user = await User.findById(userId);
    const sheet = await Sheet.findById(sheetId);

    if (!user || !sheet) {
      return res.status(404).json({ error: "User or Sheet not found" });
    }

    // Find index of the sheet in user's followed sheets
    const sheetIndex = user.sheets.findIndex(
      (s) => s.sheet_id.toString() === sheetId
    );

    if (sheetIndex !== -1) {
      // Sheet already followed → Unfollow it
      user.sheets.splice(sheetIndex, 1);
      await user.save();
      return res
        .status(200)
        .json({ message: "Successfully unfollowed the sheet", user });
    }

    // Sheet not followed → Follow it
    user.sheets.push({
      sheet_id: sheetId,
      solved_questions: [],
    });

    await user.save();
    const { password: _, ...userWithoutPassword } = user._doc;

    return res.status(200).json({
      message: "Successfully followed the sheet",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error following/unfollowing sheet:", error);
    return res
      .status(500)
      .json({ error: "Server error. Please try again later." });
  }
};

// **********************Get All Sheet**************************

const handleGetAllSheets = async (req, res) => {
  try {
    const sheets = await Sheet.find(); // Fetch all sheets
    return res.status(200).json({
      success: true,
      data: sheets,
    });
  } catch (error) {
    console.error("Error fetching sheets:", error);
    return res.status(500).json({
      success: false,
      error: "Server error. Please try again later.",
    });
  }
};


const handleGetSheetById = async (req, res) => {
    try {
      const { sheetId } = req.body; // Read from request body
      const userId = req.user.id;
  
      // Fetch the sheet along with its questions
      const sheet = await Sheet.findById(sheetId).populate("questions");
      if (!sheet) {
        return res.status(404).json({
          success: false,
          error: "Sheet not found",
        });
      }
  
      // Fetch user data to get solved questions
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: "User not found",
        });
      }
  
      // Fetch all question notes for the user
      const questionNotes = await Notes.find({ user: userId }).lean(); // Use .lean() for better performance
  
      // Ensure user.sheets exists before calling .find()
      const userSheetProgress = Array.isArray(user.sheets) && user.sheets.length > 0
        ? user.sheets.find((s) => s.sheet_id?.toString() === sheetId)
        : null;
  
      // Create a set of solved question IDs for fast lookup
      const solvedQuestionsSet = new Set();
      if (userSheetProgress && Array.isArray(userSheetProgress.solved_questions)) {
        userSheetProgress.solved_questions.forEach((q) => {
          if (q.question_id) {
            solvedQuestionsSet.add(q.question_id.toString());
          }
        });
      }
  
      const groupedQuestions = {};
  
      // Group questions by topic and mark them as solved or not
      sheet.questions.forEach((question) => {
        const topic = question.topic;
  
        if (!groupedQuestions[topic]) {
          groupedQuestions[topic] = [];
        }
  
        // Find the note for this question (Fix: Use `question_id` as per your schema)
        const note = questionNotes.find(
          (n) => n.question_id.toString() === question._id.toString()
        );
  
        groupedQuestions[topic].push({
          questionId: question._id,
          title: question.title,
          platform: question.platform,
          url: question.url,
          difficulty: question.difficulty,
          topicTags: question.topicTags,
          status: solvedQuestionsSet.has(question._id.toString()) ? "Completed" : "Not Attempted",
          noteId: note ? note._id : null, // Include noteId if available
        });
      });
  
      // Convert grouped questions into array format
      const formattedResponse = Object.keys(groupedQuestions).map((topic) => ({
        topic,
        questions: groupedQuestions[topic],
      }));
  
      return res.status(200).json({
        success: true,
        data: formattedResponse,
      });
    } catch (error) {
      console.error("Error fetching sheet by ID:", error);
      return res.status(500).json({
        success: false,
        error: "Server error. Please try again later.",
      });
    }
  };
  
  

const handleGetFollowedSheets = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from request params

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Find user and populate their followed sheets
    const user = await User.findById(userId).populate("sheets.sheet_id");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Extract and structure followed sheets
    const followedSheets = user.sheets.map(
      ({ sheet_id, solved_questions }) => ({
        id: sheet_id._id,
        title: sheet_id.title,
        description: sheet_id.description,
        totalQuestions: sheet_id.questions.length,
        solvedQuestions: solved_questions.length,
      })
    );

    return res.status(200).json({
      success: true,
      data: followedSheets,
    });
  } catch (error) {
    console.error("Error fetching followed sheets:", error);
    return res.status(500).json({
      success: false,
      error: "Server error. Please try again later.",
    });
  }
};
export {
  handleCreateSheet,
  handleFollowSheet,
  handleGetAllSheets,
  handleGetSheetById,
  handleGetFollowedSheets,
  handleFetchAndAddQuestions
};
