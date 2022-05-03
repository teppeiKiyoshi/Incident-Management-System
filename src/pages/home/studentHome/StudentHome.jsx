import React, { useEffect } from "react";
import "./studHome.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import History from "./sub-components/stud-history/History";
import Left from "./sub-components/latest-notifs/Left";
import Right from "./sub-components/latest-report/Right";
import { LinearProgress } from "@mui/material";

//pic
import headerImage from "../../../images/studHome/bannerImage.svg";
import { useNavigate, useLocation } from "react-router-dom";

// react-toastify IMPORTS
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//jwt-decode
import jwt_decode from "jwt-decode";

// Axios
import axios from "axios";

const StudentHome = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // STATES
  const [userDetails, setUserDetails] = React.useState({});
  const [userToken, setUserToken] = React.useState("");
  const [dashAllReports, setDashAllReports] = React.useState();
  const [dashLatestReport, setDashLatestReport] = React.useState();
  const [reportSuccess, setReportSuccess] = React.useState(
    location.state == null ? false : location.state.form
  );

  const [loading, setLoading] = React.useState(false);

  // SET LOGIN CREDENTIALS
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt_decode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        const details = JSON.parse(localStorage.getItem("details"));
        setUserDetails(details);
        setUserToken(token);
        setDashboardDetails();
      }
    } else {
      navigate("/login");
    }
  }, []);

  // API FUNCTIONS
  const setDashboardDetails = async () => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("details"));

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/stats/get-student-dashboard",
        { userId: user.id }
      );

      setDashLatestReport(response.data.latestReport);
      setDashAllReports(response.data.allReports);
    } catch (err) {
      toast.error(err);
    }
    setLoading(false);
  };

  // If Report submission success
  useEffect(() => {
    if (reportSuccess) {
      toast.success("Report submitted successfully!");
      navigate(location.pathname, {});
    }
  }, []);

  return (
    <div className="student-main">
      <Sidebar />
      <div className="student-container">
        <Navbar />
        {loading ? (
          <div className="progress">
            <LinearProgress />
          </div>
        ) : (
          <div>
            <div className="student-content">
              <div className="content-header">
                <div className="header-wrapper">
                  <div className="banner-wrapper">
                    <img
                      src={headerImage}
                      alt="Banner"
                      className="banner-img"
                    />
                  </div>
                  <div className="header-content">
                    <p className="greetings">Hi, Emanuelle Martin</p>
                    <h2 className="welcome">Welcome to FilinGO!</h2>
                    <p className="sub-heading">
                      creating and filing reports made easy
                    </p>
                  </div>
                </div>
              </div>
              <div className="content-body">
                <div className="right-body">
                  <Right details={dashLatestReport} />
                </div>
                <div className="left-body">
                  <Left />
                </div>
              </div>
            </div>
            <div className="content-footer">
              {dashAllReports && <History details={dashAllReports} />}
            </div>
          </div>
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

export default StudentHome;
