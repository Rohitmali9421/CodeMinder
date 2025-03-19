import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  sheets: [
    {
      sheet_id: { type: mongoose.Schema.Types.ObjectId, ref: "Sheet" }, 
      solved_questions: [
        {
          question_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
          },
          notes_id: { type: mongoose.Schema.Types.ObjectId, ref: "Note" },
          status: {
            type: String,
            enum: ["In Progress", "Completed"],
            default: "In Progress",
          },
        },
      ],
    },
  ],
});

export default mongoose.model("User", UserSchema);
