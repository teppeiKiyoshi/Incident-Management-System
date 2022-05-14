import Report from "../models/Report.js";
import User from "../models/User.js";
import Staff from "../models/Staff.js";
import Comment from "../models/Comment.js";
import Notications from "../models/Notifications.js";
import { InfoRounded } from "@mui/icons-material";

//------------ Add Report ------------//
const add = async (req, res) => {
  const { incident, mainConcern, concernDescription, file, reportedBy } =
    req.body;

  if (!incident || !mainConcern || !concernDescription) {
    return res.json({
      status: "error",
      msg: "Please provide the needed values",
    });
  }

  // Get logged in user
  const email = reportedBy;
  const user = await User.findOne({ email: email });

  // Set user's "hasReport" to true
  const update = await User.findOneAndUpdate(
    { id: user.id },
    { hasReport: true }
  );

  // Create report to Database
  const report = await Report.create({
    incident,
    mainConcern,
    concernDescription,
    file,
    status: "pending",
    assignedTo: null, // SAMPLE STAFF ID
    reportedBy: user.id,
  });

  res.json({
    status: "ok",
    user: {
      incident: report.incident,
      mainConcern: report.mainConcern,
      concernDescription: report.concernDescription,
      assignedTo: report.assignedTo,
      file: report.file,
    },
  });
};

const getReports = async (req, res) => {
  let reports;
  if (req.body.id === "") {
    reports = await Report.find().select("-file").lean();
  } else {
    reports = await Report.find({ reportedBy: req.body.id })
      .select("-file")
      .lean();
  }

  for (let report of reports) {
    const reportedBy = await User.findOne({ reportedBy: report.reportedBy });
    const name = `${reportedBy.firstName} ${reportedBy.lastName}`;

    report["reportedByName"] = name;
  }

  return res.json(reports);
};

const getUserReports = async (req, res) => {
  const id = req.body.id;

  const reports = await Report.find({ reportedBy: id }).lean();

  for (let report of reports) {
    const evaluator = await Staff.findById(report.assignedTo);

    if (evaluator) {
      const fullname = `${evaluator.firstName} ${evaluator.lastName}`;
      report["assignedToName"] = fullname;
    } else {
      report["assignedToName"] = "None";
    }
  }

  return res.json({ reports });
};

const getReportsByKeyword = async (req, res) => {
  // STOPPED HERE, DISPLAYING SEARCH RESULTS
  const request = req.body.keyword;
  const keyword = new RegExp(request, "i");

  try {
    let reports = await Report.find({
      $or: [{ mainConcern: keyword }, { incident: keyword }],
    });

    if (reports.length === 0) return res.json({ msg: "No Results" });

    for (let report of reports) {
      const reportedBy = await User.findOne({ reportedBy: report.reportedBy });
      const name = `${reportedBy.firstName} ${reportedBy.lastName}`;

      report["reportedByName"] = name;
    }
    return res.json(reports);
  } catch (err) {
    return res.json({ error: err });
  }
};

const getReportsByKeywordAutocomplete = async (req, res) => {
  // STOPPED HERE, DISPLAYING SEARCH RESULTS
  const request = req.body.keyword;
  const keyword = new RegExp(request, "i");

  try {
    let reports = await Report.find({
      $or: [{ mainConcern: keyword }],
    }).select("-file");

    if (reports.length === 0) return res.json([]);

    for (let report of reports) {
      const reportedBy = await User.findOne({ reportedBy: report.reportedBy });
      const name = `${reportedBy.firstName} ${reportedBy.lastName}`;

      report["reportedByName"] = name;
    }
    return res.json(reports);
  } catch (err) {
    return res.json({ error: err });
  }
};

const getLatestReports = async (req, res) => {
  let reports = await Report.find({}).select("-file").limit(5).lean();

  for (let report of reports) {
    const reportedBy = await User.findOne({ reportedBy: report.reportedBy });
    const assignedTo = await Staff.findById(report.assignedTo);
    const assignedToName =
      assignedTo === null
        ? "None"
        : `${assignedTo.firstName} ${assignedTo.lastName}`;
    const name = `${reportedBy.firstName} ${reportedBy.lastName}`;

    report["studNum"] = reportedBy.studNum;
    report["reportedByName"] = name;
    report["assignedToName"] = assignedToName;
  }

  return res.json(reports);
};

const getFilteredReports = async (req, res) => {
  const value = req.body.value;
  const position = req.body.position;
  let reports;

  if (value === "") {
    if (position === "student") {
      const userId = req.body.userId;

      reports = await Report.find({ reportedBy: userId })
        .select("-file")
        .lean();
    } else {
      reports = await Report.find({}).select("-file").lean();
    }
  } else if (
    value === "completed" ||
    value === "pending" ||
    value === "processing"
  )
    reports = await Report.find({ status: value }).select("-file").lean();
  else reports = await Report.find({ incident: value }).select("-file").lean();

  for (let report of reports) {
    const reportedBy = await User.findOne({ reportedBy: report.reportedBy });
    const name = `${reportedBy.firstName} ${reportedBy.lastName}`;

    report["reportedByName"] = name;
  }

  return res.json(reports);
};

const getReport = async (req, res) => {
  const id = req.body.id;
  const report = await Report.findOne({ _id: id }).lean();
  const reportedBy = await User.finrsdOne({ reportedBy: report.reportedBy });
  const assignedTo =
    report.assignedTo === null
      ? null
      : await Staff.findOne({ _id: report.assignedTo });
  const name = `${reportedBy.firstName} ${reportedBy.lastName}`;
  const evaluator =
    assignedTo === null
      ? null
      : `${assignedTo.firstName} ${assignedTo.lastName}`;

  report["author"] = name;
  report["evaluator"] = evaluator;
  report["profPic"] = reportedBy.profilePic;

  switch (report.incident) {
    case "remainingBalance":
      report["incident"] = "Remaining Balance";
      break;
    case "failedSubj":
      report["incident"] = "Failed Subject";
      break;
    case "addSubj":
      report["incident"] = "Adding Subject";
      break;
    case "changeSubj":
      report["incident"] = "Changing Subject";
      break;
    case "incSubj":
      report["incident"] = "Subjects with INC";
      break;
    case "prevSem":
      report["incident"] = "Unavailable Subjects from Previous Semester";
      break;
    case "currSem":
      report["incident"] = "Unavailable Subjects from Previous Semester";
      break;
    case "others":
      report["incident"] = "Others";
      break;
  }

  return res.json(report);
};

const setEvaluator = async (req, res) => {
  const reportId = req.body.reportId;
  const email = req.body.email;

  const user = await Staff.findOne({ email: email });

  const report = await Report.findOne({ _id: reportId }).lean();
  if (report.assignedTo === null) {
    const update = await Report.findOneAndUpdate(
      { _id: reportId },
      { assignedTo: user._id }
    );

    const staff = await Staff.findOne({ email: email }).lean();
    const fullname = staff.firstName + " " + staff.lastName;

    return res.json({
      status: "success",
      msg: "Report joined!",
      fullname: fullname,
      assignedTo: user._id,
    });
  } else {
    return res.json({
      status: "error",
      msg: "This report has been taken by another evaluator",
    });
  }
};

const markAsUnres = async (req, res) => {
  const forumId = req.body.forumId;

  try {
    const report = await Report.findById(forumId).lean();

    await Report.findByIdAndUpdate(forumId, {
      unresolvable: !report.unresolvable,
    });

    if (report.unresolvable == false)
      return res.json({ status: "success", msg: "Marked as Unresolvable" });
    else
      return res.json({ status: "success", msg: "Unmarked as Unresolvable" });
  } catch (err) {
    return res.json({ status: "error", msg: err });
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ commentedTo: req.body.id })
      .sort({ createdAt: -1 })
      .lean();

    for (let comment of comments) {
      let commenter;
      commenter = await Staff.findOne({
        _id: comment.commentedBy,
      });

      if (!commenter) {
        commenter = await User.findOne({
          _id: comment.commentedBy,
        });
      }

      const commentedBy = `${commenter.firstName} ${commenter.lastName}`;

      comment["commentedBy"] = commentedBy;
      comment["commentedByPic"] = commenter.profilePic;
    }

    return res.json({ status: "success", comments });
  } catch (err) {
    return res.json({ status: "error" });
  }
};

const addComment = async (req, res) => {
  // Insert to Database
  const { comment, file, commentedTo, commentedBy, assignedTo } = req.body;
  try {
    const commentCreate = await Comment.create({
      commentedBy: commentedBy,
      comment: comment,
      file: file,
      commentedTo: commentedTo,
    });

    const student = await User.findById(commentedBy);

    if (student && assignedTo) {
      const commentTrimmed = comment.substring(0, 40);

      const notificationCreate = await Notications.create({
        notification: `A Student replied to a report you were assigned in. "${commentTrimmed}..."`,
        notifiedTo: assignedTo,
        notificationFrom: commentedBy,
      });
    } else {
      // Notify student
      //Get Student's ID
      const report = await Report.findById(commentedTo);
      const commentTrimmed = comment.substring(0, 40);

      const notificationCreate = await Notications.create({
        notification: `An Evaluator replied to the latest report you filed. "${commentTrimmed}..."`,
        notifiedTo: report.reportedBy,
        notificationFrom: commentedBy,
      });
    }

    return res.json({ status: "success" });
  } catch (err) {
    return res.json({ status: "error", msg: err });
  }
};

const markAsHelpful = async (req, res) => {
  const id = req.body.id;
  const userId = req.body.userId;

  const update = await Report.findOneAndUpdate(
    { _id: id },
    { status: "completed" },
    { new: true }
  );

  const updateUser = await User.findOneAndUpdate(
    { _id: userId },
    { hasReport: false }
  );
  return res.json({ update });
};

export {
  add,
  getReports,
  getLatestReports,
  getFilteredReports,
  getReportsByKeyword,
  getReportsByKeywordAutocomplete,
  getReport,
  getUserReports,
  setEvaluator,
  markAsUnres,
  getComments,
  addComment,
  markAsHelpful,
};
