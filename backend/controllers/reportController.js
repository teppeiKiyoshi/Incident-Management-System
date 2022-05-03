import Report from "../models/Report.js";
import User from "../models/User.js";

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

export { add };
