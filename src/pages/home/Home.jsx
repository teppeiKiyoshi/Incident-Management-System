import "./home.scss";
import { useEffect, useState } from "react";
//components
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widgets from "../../components/widgets/Widgets";
import Chart from "../../components/chart/Chart";
import Featured from "../../components/featured/Featured";
import ListTable from "../../components/table/ListTable";
import { LinearProgress } from "@mui/material";

// react-toastify IMPORTS
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Axios
import axios from "axios";

const Home = () => {
  const [stats, setStats] = useState();
  const [loadingStats, setLoadingStats] = useState(true);

  const getStats = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/stats/getInfo"
      );

      setStats(response.data);
      setLoadingStats(false);
    } catch (err) {
      toast.error(err);
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <main className="home-main">
      <Sidebar />
      <div className="home-container">
        <Navbar />
        {loadingStats ? (
          <LinearProgress color="secondary" />
        ) : (
          <div>
            <div className="widgets-container">
              <Widgets type="user" count={stats} />
              <Widgets type="completed" count={stats} />
              <Widgets type="pending" count={stats} />
              <Widgets type="total" count={stats} />
            </div>
            <div className="charts-container">
              <Featured details={stats} />
              <Chart aspect={2.5 / 1} data={stats.sixMonthsSprint} />
            </div>
            <div className="list-container">
              <div className="list-title">Latest Filed Reports</div>
              <ListTable id={null} />
            </div>
          </div>
        )}
      </div>

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
    </main>
  );
};

export default Home;
