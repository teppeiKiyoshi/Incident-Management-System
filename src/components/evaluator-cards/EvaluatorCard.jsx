import React from "react";
import "./evaluator-card.scss";
//MUI
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DefaultProfilePic from "../../images/default-prof-pic.jpg";

//AXIOS
import axios from "axios";

const EvaluatorCard = (props) => {
  let mouseIsDown = false;

  const deleteEvaluator = (id) => {
    mouseIsDown = true;

    setTimeout(function () {
      if (mouseIsDown) {
        const userId = id;

        const response = axios
          .post("http://localhost:5000/api/v1/auth/delete-evaluator", {
            userId,
          })
          .catch((err) => {
            console.log("Error", err);
          });

        if (response) {
          console.log(response);

          props.getEvaluators();
        }
      }
    }, 3000);
  };

  const resetDelete = () => {
    mouseIsDown = false;
  };

  return (
    <div className="evalcard-main">
      <div className="card-wrapper">
        <div className="card-header"></div>
        <div className="avatar-wrapper">
          <img
            src={
              props.details.profilePic === null
                ? DefaultProfilePic
                : props.details.profilePic
            }
            alt="avatar"
            className="card-avatar"
          />
        </div>
        <div className="card-body">
          <div className="card-name">
            <h3>{`${props.details.firstName}  ${props.details.lastName}`}</h3>
            <h4>Senior Evaluator</h4>
            <small>{props.details.email}</small>
            <div className="divider"></div>
          </div>
        </div>
        <div className="card-bottom">
          <div className="card-action">
            {/* <Tooltip title="View Evaluator's Activity" arrow>
              <IconButton>
                <RemoveRedEyeOutlinedIcon
                  style={{ textTransform: "capitalize" }}
                  className="action-btn"
                />
              </IconButton>
            </Tooltip> */}
            <Tooltip
              title="Hold button for 3 Seconds to delete Evaluator"
              arrow
            >
              <IconButton
                onMouseDown={() => deleteEvaluator(props.details._id)}
                onMouseUp={resetDelete}
              >
                <DeleteIcon
                  style={{ textTransform: "capitalize" }}
                  className="action-btn"
                />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluatorCard;
