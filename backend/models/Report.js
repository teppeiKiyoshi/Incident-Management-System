import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  incident: {
    type: String,
    trim: true,
  },
  mainConcern: {
    type: String,
    trim: true,
  },
  concernDescription: {
    type: String,
    trim: true,
  },
  file: {
    type: String,
  },
  status: {
    type: String,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Report", ReportSchema);
