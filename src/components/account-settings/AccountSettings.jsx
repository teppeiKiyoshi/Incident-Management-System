import React from "react";
import { useEffect, useState } from "react";
import "./accSettings.scss";
import { TextField } from "@mui/material";
import defaultProfPic from "../../images/default-prof-pic.jpg";
import { CircularProgress } from "@mui/material";

// Axios
import axios from "axios";

// react-toastify IMPORTS
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AccountSettings = () => {
  const [details, setDetails] = useState({});
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    getLocalDetails();
  }, []);

  const getLocalDetails = () => {
    const position = JSON.parse(localStorage.getItem("details")).position;
    if (position === "student") {
      const {
        profilePic,
        lastName,
        firstName,
        middleInitial,
        email,
        phoneNum,
        studNum,
        yearLevel,
        section,
        position,
      } = JSON.parse(localStorage.getItem("details"));

      setDetails({
        profilePic: profilePic === null ? defaultProfPic : profilePic,
        lastName,
        firstName,
        middleInitial,
        email,
        phoneNum,
        studNum,
        yearLevel,
        section,
        position,
      });
    } else {
      const {
        firstName,
        lastName,
        middleInitial,
        email,
        contact,
        password,
        position,
        profilePic,
      } = JSON.parse(localStorage.getItem("details"));

      setDetails({
        profilePic: profilePic === null ? defaultProfPic : profilePic,
        lastName,
        firstName,
        middleInitial,
        email,
        contact,
        password,
        position,
      });
    }
  };

  const handleChange = (event) => {
    setDetails((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    getBase64(file).then((data) => {
      setDetails((prev) => {
        return {
          ...prev,
          [event.target.name]: data,
        };
      });
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

  const lettersOnly = (key) => {
    if (key === 32) {
    } else if (key >= 65 && key <= 90) {
    } else if (key >= 97 && key <= 122) {
    } else {
      return true;
    }
    return false;
  };

  const numbersOnly = (key) => {
    return key >= 48 && key <= 57 ? false : true;
  };

  const handlePress = (event) => {
    if (
      (event.target.name === "lastName" ||
        event.target.name === "firstName" ||
        event.target.name === "middleInitial") &&
      lettersOnly(event.which)
    ) {
      event.preventDefault();
    }
    if (event.target.name === "studNum" && numbersOnly(event.which)) {
      event.preventDefault();
    }
    if (event.target.name === "yearLevel" && numbersOnly(event.which)) {
      event.preventDefault();
    }
    if (event.target.name === "section" && lettersOnly(event.which)) {
      event.preventDefault();
    }
    if (event.target.name === "phoneNum" && numbersOnly(event.which)) {
      event.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    let detailsLocal = JSON.parse(localStorage.getItem("details"));

    const submittedDetails = {
      ...details,
      findEmail: detailsLocal.email,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/update-profile",
        submittedDetails
      );

      if (response.data.status === "error") {
        toast.error(response.data.msg);
      } else {
        let updatedProfile = response.data.updated;
        let fullname = `${updatedProfile.firstName} ${updatedProfile.middleInitial}. ${updatedProfile.lastName}`;

        let newLocal = JSON.stringify({
          ...detailsLocal,
          ...updatedProfile,
          fullname: fullname,
        });

        localStorage.setItem("details", newLocal);

        toast.success("Profile successfully updated");
      }
      setUpdateLoading(false);
    } catch (err) {
      toast.error(err);
      setUpdateLoading(false);
    }
  };

  const handleSubmitStaff = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    let detailsLocal = JSON.parse(localStorage.getItem("details"));

    const submittedDetails = {
      ...details,
      findEmail: detailsLocal.email,
      position: JSON.parse(localStorage.getItem("details")).position,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/update-profile",
        submittedDetails
      );

      console.log(response.data);
      if (response.data.status === "error") {
        toast.error(response.data.msg);
      } else {
        let updatedProfile = response.data.updated;
        let fullname = `${updatedProfile.firstName} ${updatedProfile.middleInitial}. ${updatedProfile.lastName}`;

        let newLocal = JSON.stringify({
          ...detailsLocal,
          ...updatedProfile,
          fullname: fullname,
        });

        localStorage.setItem("details", newLocal);

        toast.success("Profile successfully updated");
      }
      setUpdateLoading(false);
    } catch (err) {
      toast.error(err);
      setUpdateLoading(false);
    }
  };

  const openFileUpload = () => {
    document.getElementsByName("profilePic")[0].click();
  };

  return (
    <div className="accSettings-wrapper">
      <form
        className="accSettings-content__wrapper"
        onSubmit={
          details.position !== "student" ? handleSubmitStaff : handleSubmit
        }
      >
        <div className="header-wrapper">
          <h3 className="setting-title">Account</h3>
        </div>
        <div className="accSettings-content__left">
          <div className="accSettings-left__displayPic">
            <img
              className="accSettings-left_picture"
              src={details.profilePic}
              alt=""
              onClick={openFileUpload}
            />
            <input
              name="profilePic"
              type="file"
              accept="image/jpeg, image/jpg, image/png"
              onChange={handleFileChange}
              hidden
            />
            <div className="header-content">
              <div className="header-details">
                <h3 className="accSettings-left__userName">
                  {`${details.firstName} ${details.middleInitial}. ${details.lastName}`}
                </h3>
                <p className="sub-heading">
                  Update your photo and personal details.
                </p>
              </div>
              <div className="header-buttons">
                {updateLoading ? (
                  <CircularProgress color="secondary" />
                ) : (
                  <button className="accSettings-left__update">Update</button>
                )}
              </div>
            </div>
          </div>
          <div className="accSettings-left__details">
            <div className="accSettings-left__details-item">
              <div className="accSettings-left__details-item-wrapper">
                <p className="details-item__title">Full Name</p>
              </div>
              <div className="accSettings-left__input-item-wrapper">
                <TextField
                  onKeyPress={handlePress}
                  variant="outlined"
                  label="Last Name"
                  sx={{ width: "280px" }}
                  value={details.lastName}
                  onChange={handleChange}
                  inputProps={{ style: { textTransform: "capitalize" } }}
                  name="lastName"
                  className="text-field"
                />
                <TextField
                  onKeyPress={handlePress}
                  variant="outlined"
                  label="First Name"
                  value={details.firstName}
                  onChange={handleChange}
                  inputProps={{ style: { textTransform: "capitalize" } }}
                  name="firstName"
                  sx={{ width: "280px" }}
                />
                <TextField
                  onKeyPress={handlePress}
                  variant="outlined"
                  label="M.I."
                  value={details.middleInitial}
                  onChange={handleChange}
                  name="middleInitial"
                  sx={{ width: "80px" }}
                  inputProps={{
                    style: { textTransform: "uppercase" },
                    maxLength: 1,
                  }}
                />
              </div>
            </div>
            <div className="accSettings-left__details-item">
              <div className="accSettings-left__details-item-wrapper">
                <p className="details-item__title">Contact Information</p>
              </div>
              <div className="accSettings-left__input-item-wrapper">
                <TextField
                  variant="outlined"
                  label="Email Address"
                  value={details.email}
                  onChange={handleChange}
                  name="email"
                  sx={{ width: "400px" }}
                />
                <TextField
                  variant="outlined"
                  label="Phone Number"
                  value={
                    details.position === "student"
                      ? details.phoneNum
                      : details.contact
                  }
                  onChange={handleChange}
                  name="phoneNum"
                  inputProps={{ maxLength: 11 }}
                  onKeyPress={handlePress}
                  sx={{ width: "260px" }}
                />
              </div>
            </div>

            {details.position !== "student" ? null : (
              <div className="accSettings-left__details-item">
                <div className="accSettings-left__details-item-wrapper">
                  <p className="details-item__title">Academic Information</p>
                </div>
                <div className="accSettings-left__input-item-wrapper">
                  
                  <TextField
                    variant="outlined"
                    label="Student Number"
                    value={details.studNum}
                    onKeyPress={handlePress}
                    onChange={handleChange}
                    inputProps={{ maxLength: 10 }}
                    name="studNum"
                    sx={{ width: "200px" }}
                  />
                  <TextField
                    variant="outlined"
                    label="Year Level"
                    value={details.yearLevel}
                    onKeyPress={handlePress}
                    onChange={handleChange}
                    inputProps={{ maxLength: 1 }}
                    name="yearLevel"
                    sx={{ width: "120px" }}
                  />
                  <TextField
                    variant="outlined"
                    label="Section"
                    value={details.section}
                    onChange={handleChange}
                    onKeyPress={handlePress}
                    inputProps={{
                      maxLength: 1,
                      style: { textTransform: "uppercase" },
                    }}
                    name="section"
                    sx={{ width: "100px" }}
                  />
                </div>
              </div>
            )}
            <div className="accSettings-left__details-item">
              <div className="accSettings-left__details-item-wrapper">
                <p className="details-item__title">Password</p>
              </div>
              <div className="accSettings-left__input-item-wrapper">
                <TextField
                  variant="outlined"
                  label="Old Password"
                  name="oldPassword"
                  onChange={handleChange}
                  sx={{ width: "210px" }}
                />
                <TextField
                  variant="outlined"
                  label="New Password"
                  name="newPassword"
                  onChange={handleChange}
                  sx={{ width: "210px" }}
                />
                <TextField
                  variant="outlined"
                  label="Confirm Password"
                  name="confPassword"
                  onChange={handleChange}
                  sx={{ width: "210px" }}
                />
              </div>
            </div>
            <div className='accSettings-left__details-item pass'>
              <div className='accSettings-left__details-item-wrapper'>
                <p className='details-item__title'>Deactivate Account</p>
              </div>
              <div className='accSettings-left__input-item-wrapper'>
                <button className="deact-btn">Deactivate</button>
              </div>
            </div>
          </div>
        </div>
      </form>

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

export default AccountSettings;
