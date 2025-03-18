import Sheet from "../Model/Sheet.js";
import User from "../Model/User.js";
import axios from "axios";
import Question from "../Model/Question.js";
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

// const handleFetchAndAddQuestions = async (req, res) => {
//     try {
//       const { sheetId } = req.body; 
  
//       if (!sheetId ) {
//         return res.status(400).json({ error: "Sheet ID and API URL are required" });
//       }
  
//       const response = await axios.get("https://node.codolio.com/api/question-tracker/v1/sheet/public/get-sheet-by-slug/striver-sde-sheet");
//       const questionsData = response.data.data.questions; 
      
//       if (!Array.isArray(questionsData)) {
//         return res.status(400).json({ error: "Invalid API response format" });
//       }
  
//       const sheet = await Sheet.findById(sheetId);
//       if (!sheet) {
//         return res.status(404).json({ error: "Sheet not found" });
//       }
  
//       const questionIds = [];
  
//       for (const item of questionsData) {
//         const questionData = item.questionId; 
  
//         let existingQuestion = await Question.findOne({ title: questionData.name });
  
//         if (!existingQuestion) {
//           existingQuestion = await Question.create({
//             title: questionData.name,
//             platform: questionData.platform,
//             url: questionData.problemUrl,
//             difficulty: questionData.difficulty,
//             topic: item.topic,
//             topicTags: questionData.topics,
//           });
//         }
  
//         if (!sheet.questions.includes(existingQuestion._id)) {
//           questionIds.push(existingQuestion._id);
//         }
//       }
  
//       if (questionIds.length === 0) {
//         return res.status(400).json({ error: "All questions already exist in the sheet" });
//       }
  
//       sheet.questions.push(...questionIds);
//       await sheet.save();
  
//       return res.status(200).json({
//         message: "Questions added successfully",
//         sheet,
//       });
//     } catch (error) {
//       console.error("Error fetching and adding questions:", error);
//       return res.status(500).json({ error: "Server error. Please try again later." });
//     }
//   };

const handleFollowSheet = async (req, res) => {
    try {
      const { userId, sheetId } = req.body;
  
      if (!userId || !sheetId) {
        return res.status(400).json({ error: "User ID and Sheet ID are required" });
      }
  
      const user = await User.findById(userId);
      const sheet = await Sheet.findById(sheetId);
  
      if (!user || !sheet) {
        return res.status(404).json({ error: "User or Sheet not found" });
      }
  
      // Find index of the sheet in user's followed sheets
      const sheetIndex = user.sheets.findIndex((s) => s.sheet_id.toString() === sheetId);
  
      if (sheetIndex !== -1) {
        // Sheet already followed → Unfollow it
        user.sheets.splice(sheetIndex, 1);
        await user.save();
        return res.status(200).json({ message: "Successfully unfollowed the sheet", user });
      }
  
      // Sheet not followed → Follow it
      user.sheets.push({
        sheet_id: sheetId,
        solved_questions: [],
      });
  
      await user.save();
      const { password: _, ...userWithoutPassword } = user._doc;

      return res.status(200).json({ message: "Successfully followed the sheet", user:userWithoutPassword });
    } catch (error) {
      console.error("Error following/unfollowing sheet:", error);
      return res.status(500).json({ error: "Server error. Please try again later." });
    }
  };
  
export { handleCreateSheet ,handleFollowSheet };
