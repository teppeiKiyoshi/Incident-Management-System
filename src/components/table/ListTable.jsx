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
const ListTable = () => {
  const [data, setData] = useState();

  const getLatestReports = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/report/get-latest-reports"
      );

      setData(response.data);
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    getLatestReports();
  }, []);

  return (
    <TableContainer component={Paper} className="table-main">
      <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell className="table-cell">Tracking ID</TableCell>
            <TableCell className="table-cell">Student ID</TableCell>
            <TableCell className="table-cell">Student</TableCell>
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
                <TableCell className="table-cell">{item.studNum}</TableCell>
                <TableCell className="table-cell">
                  {item.reportedByName}
                </TableCell>
                <TableCell className="table-cell">{item.createdAt}</TableCell>
                <TableCell className="table-cell">{item.incident}</TableCell>
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
