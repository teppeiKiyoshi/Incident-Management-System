import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultProfilePic from "../../../../../images/default-prof-pic.jpg";

const Left = ({ details }) => {
  const navigate = useNavigate();
  const [createdAt, setCreatedAt] = useState();

  useEffect(() => {
    let date = new Date(details.createdAt);
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

    setCreatedAt(
      monthNames[date.getMonth()] + " " + date.getDate() + " / " + strTime
    );
  }, []);

  const viewReport = () => {
    navigate(`/forums/${details.commentedTo}`);
  };

  return (
    <>
      <div className="left-header">
        <h2 className="left-header-title">Latest Reply</h2>
        <button className="route-btn" onClick={viewReport}>
          View Report
        </button>
      </div>
      {details ? (
        <div className="left-content">
          <div className="item-wrapper">
            <div className="img-wrapper">
              <img
                src={
                  details.profilePic === null
                    ? DefaultProfilePic
                    : details.profilePic
                }
                alt="avatar"
                className="item-avatar"
              />
            </div>
            <div className="item-content">
              <p className="eval-name">{details.evalFullname}</p>
              <p className="notif-details">{details.comment}</p>
            </div>
            <div className="item-detail">
              <p className="time">{createdAt}</p>
            </div>
          </div>
        </div>
      ) : (
        <span>No Replies Yet</span>
      )}
    </>
  );
};

export default Left;
