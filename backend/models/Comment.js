import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
    },
    file: [
      {
        type: String,
      },
    ],
    commentedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
    },
    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);
