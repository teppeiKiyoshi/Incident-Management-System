import React from "react";
import DefaultProfPic from "../../../images/default-prof-pic.jpg";

const ItemComments = (props) => {
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

    return monthNames[date.getMonth()] + " " + date.getDate() + " / " + strTime;
  };

  return (
    <div className="footer-content-comment">
      <div className="content-header">
        <img
          src={
            props.details.commentedByPic
              ? props.details.commentedByPic
              : DefaultProfPic
          }
          alt="avatar"
          className="comment-avatar"
        />
        <div className="header-info">
          <h4 className="author">{props.details.commentedBy}</h4>
          <p className="reply-date">
            Replied on {formatDate(props.details.createdAt)}
          </p>
        </div>
      </div>
      <div className="footer-body">
        <p className="comment-info">{props.details.comment}</p>
      </div>
      {props.details.file.length !== 0 && (
        <div className="comment-images-container">
          <div className="comment-image-container">
            {props.details.file.map((image) => {
              return (
                <div className="comment-image">
                  <img src={image} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemComments;
