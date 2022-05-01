import React, { useEffect } from "react";
import "./studHome.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import History from "./sub-components/stud-history/History";
import Left from "./sub-components/latest-notifs/Left";
import Right from "./sub-components/latest-report/Right";

//pic
import headerImage from "../../../images/studHome/bannerImage.svg";
import { useNavigate } from "react-router-dom";

//jwt-decode
import jwt_decode from "jwt-decode";

const StudentHome = () => {
  const navigate = useNavigate();

  // STATES
  const [userDetails, setUserDetails] = React.useState({});
  const [userToken, setUserToken] = React.useState("");

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
      }
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="student-main">
      <Sidebar />
      <div className="student-container">
        <Navbar />
        <div className="student-content">
          <div className="content-header">
            <div className="header-wrapper">
              <div className="banner-wrapper">
                <img src={headerImage} alt="Banner" className="banner-img" />
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
              <Right />
            </div>
            <div className="left-body">
              <Left />
            </div>
          </div>
        </div>
        <div className="content-footer">
          <History />
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
