import "./dropdown.scss";
import React, { useState, useEffect } from "react";

import defaultProfPic from "../../../../images/default-prof-pic.jpg";

function DropDown() {
  const [profilePic, setProfilePic] = useState();

  useEffect(() => {
    const profilePic = JSON.parse(localStorage.getItem("details")).profilePic;

    setProfilePic(profilePic);
  }, []);
  return (
    <NavItem
      icon={
        <img
          src={profilePic === null ? defaultProfPic : profilePic}
          alt="avatar"
          className="navbar-avatar"
        />
      }
    >
    </NavItem>
  );
}

function NavItem(props) {
  return (
    <li className="nav-item">
      <a className="icon-button">
        {props.icon}
      </a>
    </li>
  );
}

export default DropDown;
