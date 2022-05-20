import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./process.scss";
import headerImg from "../../images/add-post.svg";

//MUI API DEPENDENCIES
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CircularProgress } from "@mui/material";

// Axios
import axios from "axios";

// react-toastify IMPORTS
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReportProcess = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});
  const [value, setValue] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    if (event.target.type === "radio") setValue(event.target.value);
    setFormValues((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files;
    let files = [];

    for (let i = 0; i < file.length; i++) {
      getBase64(file[i]).then((data) => {
        files.push(data);
      });
    }

    setFormValues((prev) => {
      return {
        ...prev,
        [event.target.name]: files,
      };
    });
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const submittedValues = { ...formValues };

    if (
      !submittedValues.hasOwnProperty("incident") ||
      !submittedValues.hasOwnProperty("mainConcern") ||
      !submittedValues.hasOwnProperty("concernDescription") ||
      submittedValues.mainConcern === "" ||
      submittedValues.concernDescription === ""
    ) {
      toast.error("Fill up the required fields");
    } else {
      handleOpen();
    }
  };

  const submitValues = async (event) => {
    setSubmitLoading(true);
    const submittedValues = {
      ...formValues,
      reportedBy: JSON.parse(localStorage.getItem("details")).email,
    };

    try {
      await axios.post(
        "http://localhost:5000/api/v1/report/add",
        submittedValues
      );

      setSubmitLoading(false);
      navigate("/student-dashboard", { state: { form: true } });
    } catch (err) {
      toast.error(err);
    }
    setSubmitLoading(false);
  };

  const handleDetails = () => {
    if (value === "remainingBalance") {
      return "Mention and highlight the reason for having a remaining balance. Elaborate and give details as to the nature of your concern.";
    } else if (value === "failedSubj") {
      return "Mention and highlight the failed subject/s. Elaborate and give details as to the nature of your concern.";
    } else if (value === "addSubj") {
      return "Mention and highlight the subject/s you wish to be added. Elaborate and give details as to the nature of your concern.";
    } else if (value === "changeSubj") {
      return "Mention and highlight the subject/s you wish to be changed. Elaborate and give details as to the nature of your concern.";
    } else if (value === "incSubj") {
      return "Mention and highlight the subject/s with INC mark/s. Elaborate and give details as to the nature of your concern.";
    } else if (value === "prevSem") {
      return "Mention and highlight the subject/s from lower year level not yet taken that you wish to enroll. Elaborate and give details as to the nature of your concern.";
    } else if (value === "currSem") {
      return "Mention and highlight the subject/s that are not available on the current semester that you wish to enroll. Elaborate and give details as to the nature of your concern.";
    } else if (value === "others") {
      return "Mention and highlight your concern/s. Elaborate and give details as to the nature of your concern.";
    } else {
      return "Elaborate and give details as to the nature of your concern.";
    }
  };

  const formatIncident = (string) => {
    switch (string) {
      case "remainingBalance":
        return "Remaining Balance";
      case "failedSubj":
        return "Failed Subject";
      case "addSubj":
        return "Adding Subject";
      case "changeSubj":
        return "Changing Subject";
      case "incSubj":
        return "Subjects with INC";
      case "prevSem":
        return "Unavailable Subjects from Previous Semester";
      case "currSem":
        return "Unavailable Subjects from Previous Semester";
      case "others":
        return "Others";
    }
  };

  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#893dff",
      fontWeight: "bold",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#aa7af0",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#aa7af0",
      },
      "&:hover fieldset": {
        borderColor: "#aa7af0",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#aa7af0",
      },
    },
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 550,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="process-main">
      <div className="process-container">
        <div className="process-header">
          <div className="header-content">
            <h2 className="header-title">
              Your platform for academic incident reports across BulSU CICT
            </h2>
            <p className="sub-title">
              Create your report at ease while we do the hard work.
            </p>
          </div>
          <div className="header-image">
            <img src={headerImg} alt="" className="img-header" />
          </div>
        </div>
        <form className="process-body">
          <div className="process-one">
            <div className="body-header">
              <div className="icon">
                <p className="icon-title">1</p>
              </div>
              <h3 className="body-title">
                Please choose an incident to report
              </h3>
            </div>
            <div className="process-types">
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  // name="row-radio-buttons-group"
                  value={value}
                  name="incident"
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="remainingBalance"
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked": {
                            color: "#893dff",
                          },
                        }}
                      />
                    }
                    label="Remaining Balance"
                  />
                  <FormControlLabel
                    value="failedSubj"
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked": {
                            color: "#893dff",
                          },
                        }}
                      />
                    }
                    label="Failed Subject"
                  />
                  <FormControlLabel
                    value="addSubj"
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked": {
                            color: "#893dff",
                          },
                        }}
                      />
                    }
                    label="Adding Subject"
                  />
                  <FormControlLabel
                    value="changeSubj"
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked": {
                            color: "#893dff",
                          },
                        }}
                      />
                    }
                    label="Changing Subject"
                  />
                  <FormControlLabel
                    value="incSubj"
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked": {
                            color: "#893dff",
                          },
                        }}
                      />
                    }
                    label="Subjects with INC"
                  />
                  <FormControlLabel
                    value="prevSem"
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked": {
                            color: "#893dff",
                          },
                        }}
                      />
                    }
                    label="Unavailable Subjects from Previous Semester"
                  />
                  <FormControlLabel
                    value="currSem"
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked": {
                            color: "#893dff",
                          },
                        }}
                      />
                    }
                    label="Unavailable Subjects on Current Semester"
                  />
                  <FormControlLabel
                    value="others"
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked": {
                            color: "#893dff",
                          },
                        }}
                      />
                    }
                    label="Others"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className="process-two">
            <div className="body-header">
              <div className="icon">
                <p className="icon-title">2</p>
              </div>
              <h3 className="body-title">Fill in the form in detail</h3>
            </div>
            <div className="process-form">
              <div className="report-main">
                <TextField
                  required
                  fullWidth
                  label="Main Concern"
                  variant="outlined"
                  placeholder="Type in your main concern here as short as possible"
                  className="text-field-report"
                  name="mainConcern"
                  onChange={handleChange}
                />
              </div>
              <div className="report-description">
                <TextField
                  className="decription-text-field"
                  required
                  fullWidth
                  multiline
                  rows={7}
                  label="Concern Description"
                  variant="outlined"
                  placeholder={handleDetails()}
                  name="concernDescription"
                  onChange={handleChange}
                />
              </div>
              <div className="btn-upload">
                <Button
                  variant="outlined"
                  color="secondary"
                  component="label"
                  startIcon={<LinkOutlinedIcon />}
                >
                  Upload Image
                  <input
                    name="file"
                    type="file"
                    accept="image/jpeg, image/jpg, image/gif, image/png"
                    onChange={handleFileChange}
                    multiple
                    hidden
                  />
                </Button>
              </div>
            </div>
          </div>
          <div className="process-three">
            <div className="body-header">
              <div className="icon">
                <p className="icon-title">3</p>
              </div>
              <h3 className="body-title">Review and Submit</h3>
            </div>
            <div className="process-review">
              <Button
                variant="contained"
                color="secondary"
                component="label"
                startIcon={<AssignmentTurnedInOutlinedIcon />}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 0}}>
            Review your Report
          </Typography>
          <Typography
            id="modal-modal-description"
            variant="p"
            component="p"
            sx={{ mt: 1}}
          >
            Please review your report before submitting:
            <br />
            <br />
            <b>Type of Incident :</b> {formatIncident(formValues.incident)}
            <br />
            <br />
            <b>Main Concern:</b> {formValues.mainConcern}
            <br />
            <br />
            <b>Description:</b> {formValues.concernDescription}
          </Typography>
          <br />
          {submitLoading ? (
            <CircularProgress color="secondary" />
          ) : (
            <div>
              <Button
                variant="text"
                color="secondary"
                onClick={handleClose}
                sx={{ fontSize: "16px", mt: 2, alignItems: "right" }}
              >
                Cancel
              </Button>
              <Button
                variant="text"
                color="secondary"
                onClick={submitValues}
                sx={{ fontSize: "16px", mt: 2, alignItems: "right" }}
              >
                Submit
              </Button>
            </div>
          )}
        </Box>
      </Modal>

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

export default ReportProcess;
