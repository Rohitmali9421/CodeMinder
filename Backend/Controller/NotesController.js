import mongoose from "mongoose";
import Notes from "../Model/Notes.js";
import GeneralNotes from "../Model/GeneralNotes.js";

// Update question notes
const handleUpdateNotes = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    if (!userId || !content) {
      return res.status(400).json({ success: false, message: "User ID and new content are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({ success: false, message: "Invalid note ID format" });
    }

    const note = await Notes.findById(noteId);
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    if (note.user.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized: You can only update your own notes" });
    }

    note.content = content;
    await note.save();

    return res.status(200).json({
      success: true,
      message: "Note updated successfully",
      note: formatNoteResponse(note),
    });
  } catch (error) {
    console.error("Error updating note:", error);
    return res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

// Fetch General Notes of a user
const getUserNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const notes = await GeneralNotes.find({ user: userId });

    return res.status(200).json({
      success: true,
      notes: notes.length ? notes.map(formatGeneralNoteResponse) : [],
      message: notes.length ? "General notes fetched successfully" : "No notes found for this user",
    });
  } catch (error) {
    console.error("Error fetching user notes:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Fetch Question Notes of a user
const getUserQuestionNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const notes = await Notes.find({ user: userId })
      .populate("question_id", "title description")
      .select("-__v -user");

    return res.status(200).json({
      success: true,
      notes: notes.length ? notes.map(formatNoteResponse) : [],
      message: notes.length ? "Question notes fetched successfully" : "No notes found for this user",
    });
  } catch (error) {
    console.error("Error fetching user question notes:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Fetch a single Question Note by ID
const handleGetNoteById = async (req, res) => {
  try {
    const { noteId } = req.params;
    const userId = req.user.id;

    const note = await Notes.findById(noteId).populate("question_id", "title description");
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    if (note.user.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized: You can only view your own notes" });
    }

    return res.status(200).json({
      success: true,
      message: "Note fetched successfully",
      note: formatNoteResponse(note),
    });
  } catch (error) {
    console.error("Error fetching note:", error);
    return res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

// Create a General Note
const createGeneralNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const { noteName, detail } = req.body;

    if (!noteName || !detail) {
      return res.status(400).json({ success: false, message: "Note name and detail are required" });
    }

    const newNote = new GeneralNotes({ user: userId, noteName, detail });
    await newNote.save();

    res.status(201).json({
      success: true,
      message: "General note created successfully",
      note: formatGeneralNoteResponse(newNote),
    });
  } catch (error) {
    console.error("Error creating general note:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update a General Note
const updateGeneralNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { noteName, detail } = req.body;

    const updatedNote = await GeneralNotes.findByIdAndUpdate(
      id,
      { noteName, detail },
    );

    if (!updatedNote) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    res.status(200).json({
      success: true,
      message: "General note updated successfully",
      note: formatGeneralNoteResponse(updatedNote),
    });
  } catch (error) {
    console.error("Error updating general note:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

 const getQuestionNoteById = async (req, res) => {
    try {
        const { id } = req.params; // Extract noteId from request parameters
        const note = await Notes.findById(id).populate("user", "name email").populate("question_id", "title");

        if (!note) {
            return res.status(404).json({ success: false, message: "Note not found" });
        }

        res.status(200).json({ success: true, note });
    } catch (error) {
        console.error("Error fetching note:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
// Create a Question Note
const createNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const { question_id, content } = req.body;

    if (!userId || !question_id || !content) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newNote = new Notes({ user: userId, question_id, content });
    await newNote.save();

    res.status(201).json({
      success: true,
      message: "Question note created successfully",
      note: formatNoteResponse(newNote),
    });
  } catch (error) {
    console.error("Error creating question note:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Helper functions for consistent response formatting
const formatNoteResponse = (note) => ({
  noteId: note._id,
  question: note.question_id
    ? { id: note.question_id._id, title: note.question_id.title, description: note.question_id.description }
    : null,
  content: note.content,
});

const formatGeneralNoteResponse = (note) => ({
  noteId: note._id,
  noteName: note.noteName,
  detail: note.detail,
});

export {
  handleUpdateNotes,
  handleGetNoteById,
  getUserNotes,
  createGeneralNote,
  getUserQuestionNotes,
  updateGeneralNote,
  createNote,
  getQuestionNoteById
};
