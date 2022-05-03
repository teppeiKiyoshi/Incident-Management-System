import User from "../models/User.js";
import Report from "../models/Report.js";
import mongoose from "mongoose";

const getStats = async (req, res) => {
  const userCount = await User.countDocuments();

  if (true) {
    return res.json({
      status: "ok",
      userCount: userCount,
    });
  } else {
    return res.json({ status: "error", user: false });
  }
};

const getStudDash = async (req, res) => {
  // Get latest report first
  const latestReport = await Report.findOne({
    reportedBy: req.body.userId,
  }).sort({ created_at: -1 });

  // Get latest Notif

  // Get all reports of user for table
  const allReports = await Report.find({
    reportedBy: req.body.userId,
  });

  return res.json({ latestReport: latestReport, allReports: allReports });
};

export { getStats, getStudDash };
