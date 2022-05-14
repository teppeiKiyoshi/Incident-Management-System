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
                {new Date(row.createdAt).toDateString()}
              </TableCell>
              <TableCell className="tableCell">{row.incident}</TableCell>
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
