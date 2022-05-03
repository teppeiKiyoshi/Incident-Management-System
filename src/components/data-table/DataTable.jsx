import { React, useEffect, useState } from "react";
import "./data-table.scss";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../data-table-db";
import { Link } from "react-router-dom";
import { LinearProgress } from "@mui/material";

// react-toastify IMPORTS
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Axios
import axios from "axios";

const DataTable = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/auth/get-students"
        );

        const students = response.data;

        const studentsMapped = students.map((student) => {
          return {
            id: student._id,
            firstname: student.firstName,
            lastname: student.lastName,
            img: "",
            studentID: student.studNum,
            email: student.email,
            yearLevel: student.yearLevel,
          };
        });

        setData(studentsMapped);
        setLoading(false);
      } catch (err) {
        toast.error(err);
      }
    };

    getUsers();
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "Action",
      headerame: "Action",
      width: "140",
      renderCell: (params) => {
        return (
          <div className="action-cell">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <Tooltip title="View User's Profile" arrow>
                <IconButton>
                  <RemoveRedEyeIcon
                    style={{ textTransform: "capitalize" }}
                    className="list-btn"
                  />
                </IconButton>
              </Tooltip>
            </Link>
            <Tooltip title="Delete User" arrow>
              <IconButton onClick={() => handleDelete(params.row.id)}>
                <DeleteIcon
                  style={{ textTransform: "capitalize" }}
                  className="list-btn"
                />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];
  return (
    <div className="data-table">
      {loading ? (
        <LinearProgress />
      ) : (
        <DataGrid
          className="data-grid"
          rows={data}
          columns={userColumns.concat(actionColumn)}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      )}

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
    </div>
  );
};

export default DataTable;
