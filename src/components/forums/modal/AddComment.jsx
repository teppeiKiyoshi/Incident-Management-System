import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";

// Axios
import axios from "axios";

// react-toastify IMPORTS
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const modalTitle = {
  fontSize: "1.5rem",
  textTransform: "uppercase",
  fontWeight: "bold",
  color: "#893dff",
};

const modalSubheading = {
  fontSize: "1rem",
  fontWeight: 600,
  color: "#999",
  marginBottom: 1,
  marginLeft: 1,
};

const submit_btn = {
  padding: "5px 25px",
  margin: "15px 20px 10px 0",
  background: "#aa7af0",

  "&:hover": {
    background: "#893dff",
  },
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState();
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitLoading(true);

    const staffId = JSON.parse(localStorage.getItem("details")).id;

    const submittedValues = {
      ...values,
      commentedTo: props.forumId,
      commentedBy: staffId,
    };

    try {
      console.log(submittedValues);
      await axios.post(
        "http://localhost:5000/api/v1/report/add-comment",
        submittedValues
      );

      props.func();
      setSubmitLoading(false);
      handleClose();
    } catch (err) {
      toast.error(err);
      setSubmitLoading(false);
      handleClose();
    }
  };

  const handleChange = (event) => {
    setValues((prev) => {
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

    setValues((prev) => {
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

  return (
    <div>
      <Button onClick={handleOpen} className="btn-comment">
        Reply
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h5" sx={modalTitle}>
            Post a reply
          </Typography>
          <Typography variant="h6" sx={modalSubheading}>
            What's on your mind?
          </Typography>
          <TextField
            label="Add Comment"
            name="comment"
            onChange={handleChange}
            required
            fullWidth
            multiline
            rows={10}
          />
          {submitLoading ? (
            <CircularProgress color="secondary" />
          ) : (
            <div>
              <Button
                size="small"
                variant="contained"
                component="label"
                sx={submit_btn}
                startIcon={<AttachFileOutlinedIcon />}
              >
                Attach a File
                <input
                  type="file"
                  name="file"
                  accept="image/jpeg, image/jpg, image/gif, image/png"
                  onChange={handleFileChange}
                  multiple
                  hidden
                />
              </Button>
              <Button
                onClick={handleSubmit}
                size="small"
                variant="contained"
                sx={submit_btn}
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
}
