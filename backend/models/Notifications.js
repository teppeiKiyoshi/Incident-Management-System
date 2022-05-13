import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    notification: {
      type: String,
    },
    notifiedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    notificationFrom: {
      type: mongoose.Schema.Types.ObjectId,
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", NotificationSchema);
