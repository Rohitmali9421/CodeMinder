import mongoose from "mongoose";
import Notes from "../Model/Notes.js";

const handleUpdateNotes = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { userId, content } = req.body;

    if (!userId || !content) {
      return res.status(400).json({ error: "User ID and new content are required" });
    }

    // Validate noteId format before querying (prevents server crash)
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({ error: "Invalid note ID format" });
    }

    // Find the note and ensure it belongs to the user
    const note = await Notes.findById(noteId);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (note.user.toString() !== userId) {
      return res.status(403).json({ error: "Unauthorized: You can only update your own notes" });
    }

    // Update content and timestamp
    note.content = content;
    await note.save();

    return res.status(200).json({
      message: "Note updated successfully",
      note,
    });
  } catch (error) {
    console.error("Error updating note:", error);
    return res.status(500).json({ error: "Server error. Please try again later." });
  }
};
const handleGetNoteById = async (req, res) => {
    try {
      const { noteId, userId } = req.params;
  
  
      // Find the note
      const note = await Notes.findById(noteId);
      if (!note) {
        return res.status(404).json({ error: "Note not found" });
      }
  
      // Ensure the note belongs to the requesting user
      if (note.user.toString() !== userId) {
        return res.status(403).json({ error: "Unauthorized: You can only view your own notes" });
      }
  
      return res.status(200).json({ message: "Note fetched successfully", note });
    } catch (error) {
      console.error("Error fetching note:", error);
      return res.status(500).json({ error: "Server error. Please try again later." });
    }
  };
export { handleUpdateNotes ,handleGetNoteById };
