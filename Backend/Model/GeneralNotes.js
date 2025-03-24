import mongoose from "mongoose";

const GeneralNoteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  noteName: { type: String, required: true },
  detail: { type: String, required: true },
});

export default mongoose.model("GeneralNote", GeneralNoteSchema);
