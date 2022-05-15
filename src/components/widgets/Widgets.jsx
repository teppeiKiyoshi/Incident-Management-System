import "./widgets.scss";
//MUI icons
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AllInboxIcon from "@mui/icons-material/AllInbox";

const Widgets = ({ type, count }) => {
  let data;

  switch (type) {
    case "user":
      data = {
        title: "Users",
        // link: "See All Users",
        counter: count.userCount,
        icon: (
          <PersonOutlineIcon
            className="widget-icon"
            style={{
              color: "goldenrod",
              backgroundColor: "rgba(218,165,32,0.2)",
            }}
          />
        ),
      };
      break;
    case "completed":
      data = {
        title: "Completed",
        // link: "View Completed Incidents",
        counter: count.completedReports,
        icon: (
          <CreditScoreIcon
            className="widget-icon"
            style={{
              color: "green",
              backgroundColor: "rgba(0,128,0,0.2)",
            }}
          />
        ),
      };
      break;
    case "pending":
      data = {
        title: "Pending",
        // link: "View Pending Incidents",
        counter: count.pendingReports,
        icon: (
          <PendingActionsIcon
            className="widget-icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255,0,0,0.2)",
            }}
          />
        ),
      };
      break;
    case "total":
      data = {
        title: "Total",
        // link: "View All Incidents",
        counter: count.totalReports,
        icon: (
          <AllInboxIcon
            className="widget-icon"
            style={{
              color: "purple",
              backgroundColor: "rgba(128,0,128,0.2)",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget-main">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.counter}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          20%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widgets;
