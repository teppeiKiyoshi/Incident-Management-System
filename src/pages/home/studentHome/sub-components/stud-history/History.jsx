import "./history.scss";
//MUI table dependecies
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

//list table for dashboard
const ListTable = (props) => {
  const rowsTry = [...props.details];

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

  return rowsTry.length ? (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Report ID</TableCell>
            <TableCell className="tableCell">Evaluator</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Report Type</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsTry.map((row) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell">{row._id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  {row.assignedTo === null ? "None" : row.evalFullname}
                </div>
              </TableCell>
              <TableCell className="tableCell">
                {formatDate(row.createdAt)}
              </TableCell>
              <TableCell className="tableCell">
                {formatIncident(row.incident)}
              </TableCell>
              <TableCell className={`tableCell ${row.status}`}>
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <div className="no-reports-yet">No Reports Yet</div>
  );
};

export default ListTable;
