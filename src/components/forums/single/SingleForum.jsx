import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./singleF.scss";
import AddComment from "../modal/AddComment";
import ItemComments from "../comment-items/ItemComments";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { LinearProgress, CircularProgress } from "@mui/material";

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

  const [loading, setLoading] = useState();
  const [assignLoading, setAssignLoading] = useState(false);
  const [unresLoading, setUnresLoading] = useState(false);

  const userId = JSON.parse(localStorage.getItem("details")).id;

  const getForumDetails = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/report/get-report",
        { id: forumId }
      );

      setReportDetails(response.data);
      setLoading(false);
      setEvaluatorName(response.data.evaluator);
      setAssignedTo(response.data.assignedTo);

      if (response.data.assignedTo !== null) setIsAssigned(true);
    } catch (err) {
      toast.error(err);
      setLoading(false);
    }
  };

  const getComments = async () => {
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

      setLoading(false);
    } catch (err) {
      toast.error(err);
      setLoading(false);
    }
  };

  //Effect - get report details
  useEffect(() => {
    setLoading(true);
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

  console.log(reportDetails);

  const showComment = () => {
    setOpen(!open);
  };

  const joinButton = !isAssigned ? (
    <button className="assign-btn" onClick={setEvaluator}>
      + Join
    </button>
  ) : null;

  return (
    <div className="single-main">
      {loading ? (
        <LinearProgress color="secondary" />
      ) : (
        <div className="single-container">
          <div className="single-left">
            <div className="left-header">
              <img
                src="https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=971&q=80"
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
                {/*
                  CONDITIONS
                  SHOW IF
                  POSITION IS STUDENT
                  AND STUDENT IS THE AUTHOR
                  AND FORUM HAS REPLIES
                */}
                {reportDetails &&
                JSON.parse(localStorage.getItem("details")).position ===
                  "student" &&
                reportDetails.reportedBy ===
                  JSON.parse(localStorage.getItem("details"))._id &&
                comments ? (
                  <div className="helpful-wrapper">
                    <p className="help-title">Was this helpful?</p>
                    <small className="help-yes">Yes</small>
                    <small className="help-no">No</small>
                  </div>
                ) : null}

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
                    {assignedTo === userId ? (
                      <AddComment forumId={forumId} func={getComments} />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="single-right">
            <div className="right-header">
              <h3 className="right-title">Forum Article Info</h3>
              <button className="print-btn">Export</button>
            </div>
            <div className="divider"></div>
            <div className="right-info">
              <p className="evaluator">
                {evaluatorName
                  ? `Assigned to ${evaluatorName}`
                  : "No evaluator assigned yet"}
              </p>
              <p className="created-date">
                Created on {reportDetails && reportDetails.createdAt}
              </p>
              <p className="update-date">
                Last Updated: {reportDetails && reportDetails.updatedAt}
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
                {reportDetails && reportDetails.unresolvable ? (
                  unresLoading ? (
                    <CircularProgress color="secondary" />
                  ) : (
                    <button className="unresolvable-btn" onClick={markAsUnres}>
                      Unmark as Unresolvable
                    </button>
                  )
                ) : unresLoading ? (
                  <CircularProgress color="secondary" />
                ) : (
                  <button className="unresolvable-btn" onClick={markAsUnres}>
                    Mark as Unresolvable
                  </button>
                )}
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
