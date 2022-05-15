import { useEffect, useState } from "react";

import "./list-table.scss";
//MUI table dependecies
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// react-toastify IMPORTS
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Axios
import axios from "axios";

//list table for dashboard
const ListTable = ({ id }) => {
  const [data, setData] = useState();

  const getLatestReports = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/report/get-user-reports",
        { id }
      );

      setData(response.data.reports);
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    getLatestReports();
  }, []);

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

  return (
    <TableContainer component={Paper} className="table-main">
      <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell className="table-cell">Tracking ID</TableCell>
            <TableCell className="table-cell">Date</TableCell>
            <TableCell className="table-cell">Incident Type</TableCell>
            <TableCell className="table-cell">Evaluator</TableCell>
            <TableCell className="table-cell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="table-cell">{item._id}</TableCell>
                <TableCell className="table-cell">
                  {formatDate(item.createdAt)}
                </TableCell>
                <TableCell className="table-cell">
                  {formatIncident(item.incident)}
                </TableCell>
                <TableCell className="table-cell">
                  {item.assignedToName}
                </TableCell>
                <TableCell className="table-cell">
                  <span className={`status ${item.status}`}>{item.status}</span>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* REACT-TOASTIFY CONTAINER */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnFocusLoss
        closeOnClick
        draggable
        pauseOnHover
      />
    </TableContainer>
  );
};

export default ListTable;
