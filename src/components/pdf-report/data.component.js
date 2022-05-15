import React from "react";

const formatDate = (dateStr) => {
  let date = new Date(dateStr);
  const monthNames = [
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

  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;

  return monthNames[date.getMonth()] + " " + date.getDate() + " - " + strTime;
};

const formatIncident = (string) => {
  switch (string) {
    case "remainingBalance":
      return "Remaining Balance";
    case "failedSubj":
      return "Failed Subject";
    case "addSubj":
      return "Adding Subject";
    case "changeSubj":
      return "Changing Subject";
    case "incSubj":
      return "Subjects with INC";
    case "prevSem":
      return "Unavailable Subjects from Previous Semester";
    case "currSem":
      return "Unavailable Subjects from Previous Semester";
    case "others":
      return "Others";
  }
};

const DataComponent = React.forwardRef((props, ref) => (
  <div className="container">
    <table className="table table-bordered table-sm" ref={ref}>
      <thead>
        <th>Report ID</th>
        <th>Main Concern</th>
        <th>Incident Type</th>
        <th>Date/Time Reported</th>
        <th>Reported By</th>
        <th>Evaluated By</th>
        <th>Replies</th>
        <th>Status</th>
      </thead>
      <tbody>
        {props.reports.map((report) => {
          return (
            <tr>
              <td>{report._id}</td>
              <td>{report.mainConcern}</td>
              <td>{formatIncident(report.incident)}</td>
              <td>{formatDate(report.createdAt)}</td>
              <td>{report.reportedByName}</td>
              <td>{report.evaluatedByName}</td>
              <td>
                {report.comments.map((comment) => {
                  return <div>{`- ${comment.comment}`}</div>;
                })}
              </td>
              <td>{report.status}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
));

export default DataComponent;
