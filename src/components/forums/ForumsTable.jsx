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

  return (
    <>
      <div className="grid-main">
        <div className="grid-items">
          <div className="tag-items">
            {/* add report type tags then query whether they exist to specific forum post see forums scss for styling and class name  */}
            <span className="report-type inc">{props.details.incident}</span>
            <span className="report-type completed">
              {props.details.status}
            </span>
          </div>
          <h3 className="title" onClick={to_singlePage}>
            {props.details.mainConcern}
          </h3>
          <span className="sub-title">
            Last comment 4 hours 54 minutes ago | Created{" "}
            {props.details.createdAt} by {props.details.reportedByName}
          </span>
          <p className="report-detail">
            {props.details.concernDescription.slice(0, 255) + "..."}
          </p>
        </div>
        <div className="grid-function">
          <div className="helpful">
            <p>{props.details.helpful}</p>
            <small>Helpful</small>
          </div>
          <div className="comments">
            <p>19</p>
            <small>Comments</small>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForumsTable;
