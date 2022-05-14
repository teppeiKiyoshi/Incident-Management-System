import User from "../models/User.js";
import Report from "../models/Report.js";
import Comment from "../models/Comment.js";
import Staff from "../models/Staff.js";
import Notifications from "../models/Notifications.js";
import mongoose from "mongoose";

const getStats = async (req, res) => {
  // Get user count
  const userCount = await User.countDocuments();
  const completedReports = await Report.countDocuments({ status: "completed" });
  const pendingReports = await Report.countDocuments({ status: "pending" });
  const totalReports = await Report.countDocuments();

  const date = new Date();
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const lastWeek = new Date(new Date() - 7 * 60 * 60 * 24 * 1000);
  const firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() - 1 + 1, 0);
  const sixMonths = new Date(date.getFullYear(), date.getMonth() - 5, 1);

  const totalToday = await Report.countDocuments({
    status: "completed",
    updatedAt: { $gte: today },
  });
  const totalLastWeek = await Report.countDocuments({
    status: "completed",
    updatedAt: { $gte: lastWeek },
  });

  const totalLastMonth = await Report.countDocuments({
    status: "completed",
    updatedAt: { $gte: firstDay, $lte: lastDay },
  });

  const lastSixMonths = await Report.find({
    createdAt: { $gte: sixMonths },
  }).lean();

  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {};

  for (let reports of lastSixMonths) {
    const date = new Date(reports.createdAt);
    const monthName = months[date.getMonth()];

    if (!data[monthName]) data[monthName] = 1;
    else data[monthName] += 1;
  }

  let day = new Date().getUTCMonth() + 1;

  for (let i = 6; i > 0; i--) {
    day -= 1;
    if (day === -1) day = 11;

    const monthName = months[day];

    if (!data[monthName]) data[monthName] = 0;
  }

  const stats = {
    userCount,
    completedReports,
    pendingReports,
    totalReports,
    totalToday,
    totalLastWeek,
    totalLastMonth,
    sixMonthsSprint: data,
  };

  return res.json({ status: "ok", ...stats });
};

const getStudDash = async (req, res) => {
  let latestReply;
  // Get latest report first
  let latestReport = await Report.findOne({
    reportedBy: req.body.userId,
  })
    .select("-file")
    .sort({ created_at: -1 })
    .lean();

  if (!latestReport) latestReport = null;
  else {
    latestReply = await Comment.findOne({
      commentedTo: latestReport._id,
    })
      .sort({ createdAt: -1 })
      .lean();
  }
  // Get Latest Reply

  if (latestReply) {
    // Get Details of Eval
    let evaluator = await Staff.findById(latestReply.commentedBy);

    if (evaluator === null) {
      evaluator = await User.findById(latestReply.commentedBy);
    }

    if (evaluator !== null) {
      latestReply["profilePic"] = evaluator.profilePic;
      latestReply[
        "evalFullname"
      ] = `${evaluator.firstName} ${evaluator.lastName}`;
    } else {
      latestReply["profilePic"] = null;
      latestReply["evalFullname"] = `Deleted Evaluator`;
    }
  } else {
    latestReply = null;
  }

  // Get all reports of user for table
  let allReports = await Report.find({
    reportedBy: req.body.userId,
  })
    .select("-file")
    .lean();

  if (!allReports) {
    allReports = null;
  } else {
    for (let report of allReports) {
      if (report.assignedTo !== null) {
        const evaluator = await Staff.findById(report.assignedTo);

        report["evalFullname"] = `${evaluator.firstName} ${evaluator.lastName}`;
      } else {
        report["evalFullname"] = null;
      }
    }
  }

  return res.json({ latestReport, allReports, latestReply });
};

export { getStats, getStudDash };
