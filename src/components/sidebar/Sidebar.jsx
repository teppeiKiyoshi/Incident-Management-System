import "./sidebar.scss";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
//components
import Time from "./Time";
//icons and pictures
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import sidebarLogoDark from "../../images/logos/logoTxt-dark.png";
import defaultProfPic from "../../images/default-prof-pic.jpg";
import axios from "axios";

const Sidebar = () => {
  const [position, setPosition] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [profilePic, setProfilePic] = useState();
  const [dashboardLink, setDashboardLink] = useState("");
  const [logoState, setLogoState] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const position = JSON.parse(localStorage.getItem("details")).position;
    const firstname = JSON.parse(localStorage.getItem("details")).firstName;
    const profilePic = JSON.parse(localStorage.getItem("details")).profilePic;
    const displayName = firstname;

    setPosition(position);
    setDisplayName(displayName);
    setProfilePic(profilePic);

    switch (position) {
      case "student":
        setDashboardLink("/student-dashboard");
        break;
      default:
        setDashboardLink("/dashboard");
    }

    getLogo();
  }, []);

  const getLogo = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/stats/get-logo"
      );

      setLogoState(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const route_Mainpage = () => {
    let path = "/";
    navigate(path);
  };

  const route_toDashboard = () => {
    let path = "/dashboard";
    navigate(path);
  };

  const navLinkStyles = ({ isActive }) => {
    return {
      textDecoration: "none",
    };
  };

  const logout = (event) => {
    localStorage.removeItem("token");
    localStorage.addItem("details");

    route_Mainpage();
  };

  return (
    <div className="sidebar-main">
      <div className="sidebar-top">
        <span className="sidebar-logo" onClick={route_toDashboard}>
          <img
            src={logoState ? logoState : sidebarLogoDark}
            alt="Filingo"
            className="img-logo"
          />
        </span>
      </div>
      <div className="sidebar-header">
        <div className="header-wrapper">
          <img
            src={profilePic === null ? defaultProfPic : profilePic}
            alt="avatar"
            className="sidebar-avatar"
          />
          <span className="header-name">{displayName}</span>
        </div>
      </div>
      <div className="sidebar-center">
        <ul>
          <p className="title">MAIN</p>
          <NavLink to={dashboardLink} style={navLinkStyles}>
            <div className="sidebar-dashboard">
              <li className="sidebar-item">
                <DashboardIcon className="sidebar-icons" />
                <span className="sidebar-name">Dashboard</span>
              </li>
            </div>
          </NavLink>

          {position !== "student" && position !== "evaluator" ? (
            <div>
              <p className="title">PEOPLE</p>
              <NavLink to="/users" style={navLinkStyles}>
                <div className="sidebar-user">
                  <li className="sidebar-item">
                    <PeopleIcon className="sidebar-icons" />
                    <span className="sidebar-name">Users</span>
                  </li>
                </div>
              </NavLink>
              <NavLink to="/evaluators" style={navLinkStyles}>
                <div className="sidebar-evaluator">
                  <li className="sidebar-item">
                    <PersonAddIcon className="sidebar-icons" />
                    <span className="sidebar-name">Evaluators</span>
                  </li>
                </div>
              </NavLink>
            </div>
          ) : null}

          <p className="title">SERVICES</p>
          <NavLink to="/forums" style={navLinkStyles}>
            <div className="sidebar-forum">
              <span className="sidebar-items collapsible">
                <QuestionAnswerIcon className="sidebar-icons" />
                <span className="sidebar-name">Tickets</span>
              </span>
            </div>
          </NavLink>
          <NavLink to="/faqs" style={navLinkStyles}>
            <div className="sidebar-log">
              <li className="sidebar-item">
                <PsychologyIcon className="sidebar-icons" />
                <span className="sidebar-name">FaQs</span>
              </li>
            </div>
          </NavLink>
          <p className="title">TOOLS</p>
          <NavLink to="/settings" style={navLinkStyles}>
            <div className="sidebar-setting">
              <li className="sidebar-item">
                <SettingsIcon className="sidebar-icons" />
                <span className="sidebar-name">Settings</span>
              </li>
            </div>
          </NavLink>
          <div className="sidebar-logout" onClick={route_Mainpage}>
            <li className="sidebar-item">
              <ExitToAppIcon className="sidebar-icons" />
              <span className="sidebar-name" onClick={logout}>
                Logout
              </span>
            </li>
          </div>
        </ul>
      </div>
      <div className="sidebar-bottom">
        <div className="time-container">
          <Time />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
