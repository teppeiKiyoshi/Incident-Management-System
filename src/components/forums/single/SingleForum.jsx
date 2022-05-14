import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./singleF.scss";
import AddComment from "../modal/AddComment";
import ItemComments from "../comment-items/ItemComments";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { LinearProgress, CircularProgress } from "@mui/material";
import DefaultProfPic from "../../../images/default-prof-pic.jpg";

// Axios
import axios from "axios";

// react-toastify IMPORTS
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SingleForum = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isAssigned, setIsAssigned] = useState(false);
  const [reportDetails, setReportDetails] = useState();
  const [evaluatorName, setEvaluatorName] = useState();
  const [assignedTo, setAssignedTo] = useState();
  const { forumId } = useParams();
  const [comments, setComments] = useState();
  const [commentNumber, setCommentNumber] = useState(0);

  const [loading, setLoading] = useState(true);
  const [assignLoading, setAssignLoading] = useState(false);
  const [unresLoading, setUnresLoading] = useState(false);

  const userId = JSON.parse(localStorage.getItem("details")).id;

  const getForumDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/report/get-report",
        { id: forumId }
      );

      setReportDetails(response.data);
      setEvaluatorName(response.data.evaluator);
      setAssignedTo(response.data.assignedTo);

      if (response.data.assignedTo !== null) setIsAssigned(true);
    } catch (err) {
      toast.error(err);
    }
    setLoading(false);
  };

  const getComments = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/report/get-comments",
        { id: forumId }
      );

      const commentsArr = response.data.comments;

      setCommentNumber(commentsArr.length);
      setComments(() => {
        return commentsArr.map((comment) => {
          return <ItemComments key={comment._id} details={comment} />;
        });
      });
    } catch (err) {
      toast.error(err);
    }
    setLoading(false);
  };

  //Effect - get report details
  useEffect(() => {
    getForumDetails();
    getComments();
  }, []);

  const setEvaluator = async () => {
    setAssignLoading(true);
    const email = JSON.parse(localStorage.getItem("details")).email;
    const reportId = forumId;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/report/set-evaluator",
        { reportId: reportId, email: email }
      );

      if (response.data.msg.status == "error") {
        toast.error(response.data.msg);
      } else {
        setIsAssigned(true);
        toast.success(response.data.msg);
        setEvaluatorName(response.data.fullname);
        setAssignedTo(response.data.assignedTo);
      }

      setAssignLoading(false);
    } catch (err) {
      toast.error(err);
      setAssignLoading(false);
    }

    setAssignLoading(false);
  };

  const markAsUnres = async () => {
    setUnresLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/report/mark-as-unres",
        { forumId: forumId }
      );

      if (response.data.status == "success") {
        toast.success(response.data.msg);
        setUnresLoading(false);
      } else {
        toast.error(response.data.msg);
        setUnresLoading(false);
      }

      setReportDetails((prev) => {
        return {
          ...prev,
          unresolvable: !prev.unresolvable,
        };
      });
    } catch (err) {
      toast.error(err);
      setUnresLoading(false);
    }
  };

  const showComment = () => {
    setOpen(!open);
  };

  const joinButton =
    !isAssigned &&
    JSON.parse(localStorage.getItem("details")).position !== "student" ? (
      <button className="assign-btn" onClick={setEvaluator}>
        + Join
      </button>
    ) : null;

  const markAsHelpful = async () => {
    const userId = JSON.parse(localStorage.getItem("details")).id;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/report/mark-as-helpful",
        { id: reportDetails._id, userId }
      );

      getForumDetails();
    } catch (err) {
      console.log(err);
    }
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

    return monthNames[date.getMonth()] + " " + date.getDate() + " / " + strTime;
  };

  const exportReport = (str) => {
    navigate("/report-pdf/" + str);
  };

  return (
    <div className="single-main">
      {loading ? (
        <LinearProgress color="secondary" />
      ) : (
        <div className="single-container">
          <div className="single-left">
            <div className="left-header">
              <img
                src={
                  reportDetails &&
                  (reportDetails.profPic === null
                    ? DefaultProfPic
                    : reportDetails.profPic)
                }
                alt="avatar"
                className="forum-avatar"
              />
              <div className="header-info">
                <h3 className="header-name">
                  {reportDetails && reportDetails.author}
                </h3>
                <small className="sub-heading">Article Author</small>
              </div>
              <div className="assign-content">
                {assignLoading ? (
                  <CircularProgress color="secondary" />
                ) : (
                  joinButton
                )}
              </div>
            </div>
            <div className="left-body">
              <div className="body-wrapper">
                <div className="body-title">
                  <h3 className="report-title">
                    {reportDetails && reportDetails.mainConcern}
                  </h3>
                </div>
                <div className="body-content">
                  <p className="report-content">
                    {reportDetails && reportDetails.concernDescription}
                  </p>
                </div>

                {reportDetails &&
                  (reportDetails.file.length !== 0 ? (
                    <>
                      <span>Attachments</span>
                      <div className="images-container">
                        <div className="image-container">
                          {reportDetails &&
                            reportDetails.file.map((image) => {
                              return (
                                <div className="image">
                                  <img src={image} />
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </>
                  ) : null)}

                {reportDetails &&
                JSON.parse(localStorage.getItem("details")).position ===
                  "student" &&
                reportDetails.reportedBy ===
                  JSON.parse(localStorage.getItem("details")).id &&
                reportDetails.assignedTo &&
                comments &&
                reportDetails.status !== "completed" ? (
                  <div className="helpful-wrapper">
                    <p className="help-title">
                      Was this helpful? if you think so,
                    </p>
                    <small className="help-yes" onClick={markAsHelpful}>
                      Close the discussion
                    </small>
                  </div>
                ) : null}

                {reportDetails && reportDetails.status === "completed" && (
                  <span className="resolved">This case has been resolved</span>
                )}
                <div className="body-footer">
                  <div className="footer-header">
                    <h3 className="comment-title">
                      Replies{" "}
                      <span className="comment-count">({commentNumber})</span>{" "}
                    </h3>
                    {!open ? (
                      <MdKeyboardArrowDown
                        className="btn-icon"
                        onClick={showComment}
                      />
                    ) : (
                      <MdKeyboardArrowUp
                        className="btn-icon"
                        onClick={showComment}
                      />
                    )}
                  </div>
                  {open && <div className="footer-container">{comments}</div>}
                  <div className="btn-container">
                    {reportDetails &&
                    (assignedTo === userId ||
                      reportDetails.reportedBy === userId) &&
                    reportDetails.status !== "completed" ? (
                      <AddComment
                        forumId={forumId}
                        assignedTo={reportDetails.assignedTo}
                        func={getComments}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="single-right">
            <div className="right-header">
              <h3 className="right-title">Forum Article Info</h3>
              <button
                className="print-btn"
                onClick={() => exportReport(forumId)}
              >
                Export
              </button>
            </div>
            <div className="divider"></div>
            <div className="right-info">
              <p className="evaluator">
                {evaluatorName
                  ? `Assigned to ${evaluatorName}`
                  : "No evaluator assigned yet"}
              </p>
              <p className="created-date">
                Created on{" "}
                {reportDetails && formatDate(reportDetails.createdAt)}
              </p>
              <p className="update-date">
                Last Updated:{" "}
                {reportDetails && formatDate(reportDetails.updatedAt)}
              </p>
              <div className="info-tags">
                <div className="tag-header">
                  <h5 className="tag-title">Applies to:</h5>
                  <div className="tags">
                    <span className="tag-item">
                      {reportDetails && reportDetails.incident}
                    </span>
                  </div>
                </div>
              </div>
              <div className="case-status">
                {JSON.parse(localStorage.getItem("details")).position !==
                "student" ? (
                  reportDetails && reportDetails.unresolvable ? (
                    unresLoading ? (
                      <CircularProgress color="secondary" />
                    ) : (
                      <button
                        className="unresolvable-btn"
                        onClick={markAsUnres}
                      >
                        Unmark as Unresolvable
                      </button>
                    )
                  ) : unresLoading ? (
                    <CircularProgress color="secondary" />
                  ) : (
                    <button className="unresolvable-btn" onClick={markAsUnres}>
                      Mark as Unresolvable
                    </button>
                  )
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}

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
    </div>
  );
};

export default SingleForum;
