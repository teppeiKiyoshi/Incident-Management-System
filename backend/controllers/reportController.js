import Report from "../models/Report.js";

//------------ Add Report ------------//
const add = async (req, res) => {
  const { incident, mainConcern, concernDescription, file } = req.body;

  if (!incident || !mainConcern || !concernDescription) {
    return res.json({
      status: "error",
      msg: "Please provide the needed values",
    });
  }

  // Create report to Database
  const report = await Report.create({
    incident,
    mainConcern,
    concernDescription,
    file,
    status: "pending",
    assignedTo: "625a405198c2ae19089b3af9",
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
