import "./navbar.scss";
import { React, useEffect, useState } from "react";
import Search from "../search/Search";
import DropDown from "./dropdownMenu/acc-dropdown//DropdownMenu";
//MUI Icons
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
//for dark mode
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import NotifMenu from "./dropdownMenu/notif-dropdown/NotifMenu";

// Axios
import axios from "axios";

// react-toastify IMPORTS
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const [notifications, setNotifications] = useState();
  const [notifUnseenCount, setNotifUnseenCount] = useState();
  const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false);

  const getNotifications = async () => {
    const userId = JSON.parse(localStorage.getItem("details")).id;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/get-notifications",
        { userId }
      );

      setNotifications(response.data.notifications);
      setNotifUnseenCount(response.data.unseen);
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const handleNotifClick = () => {
    dispatch({ type: "TOGGLE" });
  };

  const seenNotifs = async () => {
    setIsNotifMenuOpen(!isNotifMenuOpen);
    const userId = JSON.parse(localStorage.getItem("details")).id;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/seen-notifications",
        { userId }
      );

      console.log(response);
    } catch (err) {
      toast.error(err);
    }

    getNotifications();
  };

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);

  const { dispatch } = useContext(DarkModeContext);
  return (
    <nav className="navbar-main">
      <div className={navbar ? "navbar-wrapper active" : "navbar-wrapper"}>
        <div className="navbar-search">
          <Search />
        </div>
        <div className="navbar-menu">
          <div className="menu-item">
            <DarkModeOutlinedIcon
              className="navbar-icons"
              onClick={handleNotifClick}
            />
          </div>
          <div className="menu-item">
            <NotificationsNoneOutlinedIcon
              className="navbar-icons"
              onClick={seenNotifs}
            />
            {notifications && notifUnseenCount > 0 ? (
              <div className="notif-counter">{notifUnseenCount}</div>
            ) : null}

            {isNotifMenuOpen && <NotifMenu details={notifications} />}
          </div>
          <div className="menu-item">
            <DropDown />
          </div>
        </div>
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
    </nav>
  );
};

export default Navbar;
