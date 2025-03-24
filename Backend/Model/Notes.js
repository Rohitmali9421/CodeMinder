import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  question_id: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
  content: { type: String, required: true },
});

export default mongoose.model("Notes", NoteSchema);
