import mongoose from "mongoose";

const CmsSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  answer: {
    type: String,
  },
});

export default mongoose.model("Cms", CmsSchema);
