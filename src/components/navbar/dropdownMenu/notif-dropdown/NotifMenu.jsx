import React from "react";
import "./notifs.scss";

const NotifMenu = ({ details }) => {
  // const goToReport = (str) => {
  //   window.location = "/forums/" + str;
  // };

  const NotifItems = () => {
    const items = details.map((detail) => {
      return (
        <div key={detail._id} className="notifs-item">
          {/* <div className="icon">
            <Password className="notifs-icon" />
          </div> */}
          <div className="details">
            <p className="notifs-details">{detail.notification}</p>
          </div>
          <div className="status">
            {detail.seen ? null : <div className="notifs-status"></div>}
          </div>
        </div>
      );
    });

    return items;
  };

  return (
    <div className="notifs-main">
      <div className="notifs-container">
        <div className="notifs-header">
          <h2 className="header-title">Notifications</h2>
        </div>

        {/* <div className="notifs-filter">
          <button className="all-btn">All</button>
          <button className="unread-btn">Unread</button>
        </div> */}
        <div className="notifs-content">
          <NotifItems />
        </div>
      </div>
    </div>
  );
};

export default NotifMenu;
