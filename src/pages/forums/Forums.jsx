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
import { LocalSeeOutlined } from "@mui/icons-material";

const Forums = () => {
  const { keyword } = useParams();
  const [hasReport, setHasReport] = useState();
  const [createReportLoad, setCreateReportLoad] = useState(false);
  const [reports, setReports] = useState();
  const [reportsArr, setReportsArr] = useState();
  const [reportsLoad, setReportsLoad] = useState();
  const [filterState, setFilter] = useState();
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
          setCreateReportLoad(false);
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
    const details = JSON.parse(localStorage.getItem("details"));
    let id;

    if (details.position === "student") id = details.id;
    else id = "";

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/report/get-reports",
        { id: id }
      );
      console.log(response.data);

      setReports(
        response.data.map((report) => {
          return <ForumsTable key={report._id} details={report} />;
        })
      );
      setReportsArr(response.data);
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
        console.log(response.data);
        setReportsArr(response.data);
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
    const position = JSON.parse(localStorage.getItem("details")).position;
    const userId = JSON.parse(localStorage.getItem("details")).id;
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/report/get-filtered-reports",
        { value, position, userId }
      );

      if (response.data) {
        setReports(
          response.data.map((report) => {
            return <ForumsTable key={report._id} details={report} />;
          })
        );
        setReportsArr(response.data);
        setFilter(value);
      }
      setReportsLoad(false);
    } catch (err) {
      toast.error(err);
      setReportsLoad(false);
    }
  };

  const exportReports = () => {
    const firstName = JSON.parse(localStorage.getItem("details")).firstName;
    const lastName = JSON.parse(localStorage.getItem("details")).lastName;
    const fullname = `${firstName} ${lastName}`;
    let filter = filterState
      ? 'filtered by "' + formatIncident(filterState) + '"'
      : "";

    if (keyword) {
      filter += ' by keyword "' + keyword + '"';
    }

    navigate("/report-pdf", {
      state: { reports: reportsArr, filter: filter, by: fullname },
    });
    // HOW TO EMPTY STATE navigate(location.pathname, {});
  };

  const routeChange = () => {
    let path = "/forums/add-post";
    navigate(path);
  };

  const formatIncident = (string) => {
    switch (string) {
      case "all":
        return;
      case "completed":
        return "Completed";
      case "pending":
        return "Pending";
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
    <div className="forums-main">
      <Sidebar />
      <div className="forums-container">
        <Navbar />
        <div className="forums-header">
          <div className="forums-title">
            <h2 className="main-title">Tickets</h2>
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
            {JSON.parse(localStorage.getItem("details")).position ===
              "student" || reportsLoad ? null : (
              <Button color="secondary" onClick={exportReports}>
                Export
              </Button>
            )}

            <select
              name="report"
              id="report"
              className="filter-dropdown"
              onChange={dropdownChange}
            >
              <option value="" selected disabled>
                -Select to Filter your Search-
              </option>
              <option value="completed" className="filter-option">
                Completed
              </option>
              <option value="pending" className="filter-option">
                Pending
              </option>
              <option value="unresolvable" className="filter-option">
                Unresolvable
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
          <div>
            <br />
            <LinearProgress color="secondary" />
          </div>
        ) : reports && reports.length !== 0 ? (
          reports
        ) : (
          <div className="no-results">No Results</div>
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
