import React from "react";
import { useNavigate } from "react-router-dom";

const Right = (props) => {
  const navigate = useNavigate();

  function titleCase(str) {
    return str
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  const goToReport = () => {
    navigate(`/forums/${props.details._id}`);
  };

  return (
    <>
      <div className="right-header">
        <h2 className="right-header-title">Latest Report Details</h2>
        {props.details && (
          <button className="route-btn" onClick={goToReport}>
            View Report
          </button>
        )}
      </div>
      <div className="right-content">
        <div className="right">
          <div className="report">
            <p className="title">Report ID</p>
            <p className="content">{props.details && props.details._id}</p>
          </div>
          <div className="report">
            <p className="title">Date Created</p>
            <p className="content">
              {props.details &&
                new Date(props.details.createdAt).toDateString()}
            </p>
          </div>
          <div className="report">
            <p className="title">Main Concern</p>
            <p className="content">
              {props.details && titleCase(props.details.mainConcern)}
            </p>
          </div>
        </div>
        <div className="left">
          <div className="report">
            <p className="title">Evaluator</p>
            <p className="content">
              {props.details ? props.details.assignedTo ?? "None" : "Not Yet"}
            </p>
          </div>
          <div className="report">
            <p className="title">Last Updated</p>
            <p className="content">
              {props.details &&
                new Date(props.details.updatedAt).toDateString()}
            </p>
          </div>
          <div className="report">
            <p className="title">Status</p>
            <p className="content">
              {props.details && titleCase(props.details.status)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Right;
