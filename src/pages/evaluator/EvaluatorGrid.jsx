import React, { useEffect, useState } from "react";
import "./evalGrid.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import EvaluatorCard from "../../components/evaluator-cards/EvaluatorCard";
import { AiOutlineClose } from "react-icons/ai";

//MUI dependencies
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import { LinearProgress } from "@mui/material";

// Axios
import axios from "axios";

// react-toastify IMPORTS
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EvaluatorGrid = () => {
  const [modal, setModal] = useState(false);
  const [registerValues, setRegisterValues] = useState({});
  const [evaluatorList, setEvaluatorList] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  // Effect - Get evaluator details
  useEffect(() => {
    getEvaluators();
  }, []);

  const getEvaluators = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/auth/get-evaluators"
      );

      setEvaluatorList(response.data);
    } catch (err) {
      toast.error(err);
    }
    setLoading(false);
  };

  const handleChange = (event) => {
    setRegisterValues((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const submittedValues = { ...registerValues };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/register/staff",
        submittedValues
      );

      if (response.data.msg) {
        toast.error(response.data.msg);
      } else {
        toast.success("Evaluator successfully registered!");
        toggleModal();
        getEvaluators();
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="evalgrid-main">
      <Sidebar />
      <div className="evalgrid-wrapper">
        <Navbar />
        {loading ? (
          <LinearProgress />
        ) : (
          <div>
            <div className="evalgrid-header">
              <div className="evalgrid-title">
                <h2 className="title">List of Evaluators</h2>
                <Button
                  startIcon={<AddIcon />}
                  variant="contained"
                  className="evalreg-btn"
                  onClick={toggleModal}
                >
                  Register
                </Button>
              </div>
            </div>
            <div className="evalgrid-functions">
              {modal && (
                <form className="modal" onSubmit={handleSubmit}>
                  <div onClick={toggleModal} className="overlay"></div>
                  <div className="modal-content">
                    <h2 className="content-title">Register an Evaluator</h2>
                    <TextField
                      required
                      name="lastName"
                      onChange={handleChange}
                      variant="outlined"
                      label="Last Name"
                      sx={{ width: "220px", m: 2 }}
                    />
                    <TextField
                      required
                      name="firstName"
                      onChange={handleChange}
                      variant="outlined"
                      label="First Name"
                      sx={{ width: "220px", m: 2 }}
                    />
                    <TextField
                      name="middleInitial"
                      onChange={handleChange}
                      variant="outlined"
                      label="M.I."
                      sx={{ width: "60px", m: 2 }}
                    />
                    <TextField
                      required
                      name="email"
                      onChange={handleChange}
                      variant="outlined"
                      label="Email"
                      sx={{ m: 2, width: "350px" }}
                    />
                    <TextField
                      required
                      name="contact"
                      onChange={handleChange}
                      variant="outlined"
                      label="Contact Number"
                      sx={{ m: 2, width: "180px" }}
                    />
                    <TextField
                      required
                      name="password"
                      onChange={handleChange}
                      variant="outlined"
                      label="Password"
                      sx={{ m: 2, width: "265px" }}
                    />
                    <TextField
                      required
                      name="confirmPassword"
                      onChange={handleChange}
                      variant="outlined"
                      label="Confirm Password"
                      sx={{ m: 2, width: "265px" }}
                    />
                    <div className="btn-container">
                      <button className="btn_submit">Register</button>
                    </div>
                    <button className="close-modal" onClick={toggleModal}>
                      <AiOutlineClose />
                    </button>
                  </div>
                </form>
              )}
              <div className="filter-wrapper">
                <div className="filter-eval">
                  <select name="report" id="report" className="filter-dropdown">
                    <option value="">-Select to Filter your Search-</option>
                    <option value="Completed" className="filter-option">
                      Active Evaluators
                    </option>
                    <option value="Assigned" className="filter-option">
                      Inactive Evaluators
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div className="card-container">
              {evaluatorList.map((evaluator) => {
                return (
                  <EvaluatorCard key={evaluator._id} details={evaluator} />
                );
              })}
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
    </div>
  );
};

export default EvaluatorGrid;
