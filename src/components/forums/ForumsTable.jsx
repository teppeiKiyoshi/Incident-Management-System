import React from "react";
import { useNavigate } from "react-router-dom";
import forumdb from "../../Forums-DB";

const ForumsTable = (props) => {
  const navigate = useNavigate();
  const to_singlePage = () => {
    let path = `/forums/${props.details._id}`;
    navigate(path);
    //STOPPED HERE GET ID AND PASS TO PARAMETERS
  };

  const formatDate = (dateStr) => {
    let date = new Date(dateStr);
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

    return monthNames[date.getMonth()] + " " + date.getDate() + " - " + strTime;
  };

  const formatIncident = (string) => {
    switch (string) {
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
    <>
      <div className="grid-main">
        <div className="grid-items">
          <div className="tag-items">
            {/* add report type tags then query whether they exist to specific forum post see forums scss for styling and class name  */}
            <span className="report-type inc">
              {formatIncident(props.details.incident)}
            </span>
            <span className={`report-type ${props.details.status}`}>
              {props.details.status
                .split(" ")
                .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
                .join(" ")}
            </span>
          </div>
          <h3 className="title" onClick={to_singlePage}>
            {props.details.mainConcern}
          </h3>
          <span className="sub-title">
            Created at {formatDate(props.details.createdAt)} by{" "}
            {props.details.reportedByName}
          </span>
          <p className="report-detail">
            {props.details.concernDescription.slice(0, 255) + "..."}
          </p>
        </div>
        <div className="grid-function">
          {/* <div className="helpful">
            <p>{props.details.helpful}</p>
            <small>Helpful</small>
          </div>
          <div className="comments">
            <p>19</p>
            <small>Comments</small>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ForumsTable;
