import "./single.scss";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ListTable from "../../components/table/ListTable";
import { useEffect, useState } from "react";
import DefaultProfilePic from "../../images/default-prof-pic.jpg";

// Axios
import axios from "axios";

const Single = () => {
  const { userId } = useParams();

  const [details, setDetails] = useState();

  const getDetails = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/get-student-details",
        { userId }
      );
      console.log(response.data);
      setDetails(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div className="singlePage-main">
      <Sidebar />
      <div className="singlePage-container">
        <Navbar />
        <div className="single-top">
          <div className="single-left">
            <h1 className="left-title">Student Information</h1>
            <div className="item">
              {details && (
                <img
                  src={
                    details.profilePic === null
                      ? DefaultProfilePic
                      : details.profilePic
                  }
                  alt="user"
                  className="item-image"
                />
              )}

              <div className="user-details">
                <h2 className="item-title">
                  {details && details.firstName + " " + details.lastName}
                </h2>
                <div className="detail-item">
                  <span className="item-key">Email: </span>
                  <span className="item-value">{details && details.email}</span>
                </div>
                <div className="detail-item">
                  <span className="item-key">Phone: </span>
                  <span className="item-value">
                    {details && details.phoneNum}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="item-key">Student ID: </span>
                  <span className="item-value">
                    {details && details.studNum}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="single-bottom">
          <h1 className="left-title">Recent Student Logs</h1>
          <ListTable id={userId} />
        </div>
      </div>
    </div>
  );
};

export default Single;
