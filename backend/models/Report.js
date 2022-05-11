import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
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
    file: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
    },
    unresolvable: {
      type: Boolean,
      default: false,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    helpful: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Report", ReportSchema);
