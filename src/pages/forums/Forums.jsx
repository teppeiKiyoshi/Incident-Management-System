import React, { useEffect, useState } from "react";
import "./forums.scss";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import ForumsTable from "../../components/forums/ForumsTable";
// import SearchForums from "../../components/searchbar/forums-search/SearchForums";
import { CircularProgress, LinearProgress } from "@mui/material";

// Axios
import axios from "axios";

// react-toastify IMPORTS
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//MUI
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import Button from "@mui/material/Button";

const Forums = () => {
  const { keyword } = useParams();
  const [hasReport, setHasReport] = useState();
  const [createReportLoad, setCreateReportLoad] = useState(false);
  const [reports, setReports] = useState();
  const [reportsLoad, setReportsLoad] = useState();
  const position = JSON.parse(localStorage.getItem("details")).position;
  const navigate = useNavigate();

  // Effect - Know first if user has a report
  useEffect(() => {
    const checkHasReport = async () => {
      if (position === "student") {
        setCreateReportLoad(true);
        const email = {
          email: JSON.parse(localStorage.getItem("details")).email,
        };

        try {
          const response = await axios.post(
            "http://localhost:5000/api/v1/auth/get-student",
            email
          );

          const has = response.data.hasReport;

          setCreateReportLoad(false);
          setHasReport(has);
        } catch (err) {
          toast.error(err);
        }
      }
    };

    checkHasReport();
  }, []);

  // Effect - Get all reports
  useEffect(() => {
    setReportsLoad(true);

    if (keyword) {
      getReportsByKeyword();
    } else {
      getAllReports();
    }
  }, []);

  const getAllReports = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/report/get-reports"
      );

      setReports(
        response.data.map((report) => {
          return <ForumsTable key={report._id} details={report} />;
        })
      );
      setReportsLoad(false);
    } catch (err) {
      toast.error(err);
      setReportsLoad(false);
    }
  };

  const getReportsByKeyword = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/report/get-reports-keyword",
        { keyword: keyword }
      );

      if (!response.data.msg) {
        setReports(
          response.data.map((report) => {
            return <ForumsTable key={report._id} details={report} />;
          })
        );
      }
      setReportsLoad(false);
    } catch (err) {
      toast.error(err);
      setReportsLoad(false);
    }
  };

  const dropdownChange = async (e) => {
    setReportsLoad(true);
    const value = e.target.value;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/report/get-filtered-reports",
        { value }
      );

      setReports(
        response.data.map((report) => {
          return <ForumsTable key={report._id} details={report} />;
        })
      );
      setReportsLoad(false);
    } catch (err) {
      toast.error(err);
      setReportsLoad(false);
    }
  };

  const routeChange = () => {
    let path = "/forums/add-post";
    navigate(path);
  };

  return (
    <div className="forums-main">
      <Sidebar />
      <div className="forums-container">
        <Navbar />
        <div className="forums-header">
          <div className="forums-title">
            <h2 className="main-title">Forums</h2>
            {position === "student" ? (
              createReportLoad ? (
                <CircularProgress color="secondary" />
              ) : hasReport ? null : (
                <Button
                  startIcon={<AddCardOutlinedIcon />}
                  variant="contained"
                  className="addPost-btn"
                  onClick={routeChange}
                >
                  Create Report
                </Button>
              )
            ) : null}
          </div>
        </div>
        <div className="search-wrapper">
          {/* <SearchForums /> */}
          <div className="filter-forum">
            <select
              name="report"
              id="report"
              className="filter-dropdown"
              onChange={dropdownChange}
            >
              <option value="" selected disabled>
                -Select to Filter your Search-
              </option>
              <option value="" className="filter-option">
                All
              </option>
              <option value="completed" className="filter-option">
                Completed
              </option>
              <option value="assigned" className="filter-option">
                Pending
              </option>
              <option value="processing" className="filter-option">
                Processing
              </option>
              <option value="remainingBalance" className="filter-option">
                Remaining Balance
              </option>
              <option value="incSubj" className="filter-option">
                Subject with INC
              </option>
              <option value="failedSubj" className="filter-option">
                Failed Subject
              </option>
              <option value="addSubj" className="filter-option">
                Add Subject
              </option>
              <option value="changeSubj" className="filter-option">
                Change Subject
              </option>
              <option value="prevSem" className="filter-option">
                Unavailable Subj - Prev Sem
              </option>
              <option value="currSem" className="filter-option">
                Unavailble Subj - Curr Sem
              </option>
              <option value="others" className="filter-option">
                Other
              </option>
            </select>
          </div>
        </div>

        {reportsLoad ? (
          <LinearProgress color="secondary" />
        ) : reports ? (
          reports
        ) : (
          "No results"
        )}
      </div>

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

export default Forums;
