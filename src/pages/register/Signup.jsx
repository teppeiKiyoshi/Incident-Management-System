import React from "react";
import "./signup.scss";
import signupIcon from "../../images/signup_img.svg";

//MUI
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const routeChange = () => {
    let path = "/login";
    navigate(path);
  };
  const [values, setValues] = React.useState({});
  const [showPassword, setShowPassword] = React.useState(false);

  const handleChange = (event) => {
    setValues((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

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

  const handleClickShowPassword = () => {
    setShowPassword((prev) => {
      return !prev;
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="signup-main">
      <div className="signup-container">
        <div className="signup-wrapper">
          <h1 className="signup-title">Sign Up</h1>
          <p className="sub-title">Let's get you started!</p>
          <form className="signup-form">
            <div className="name_field">
              {/* LAST NAME */}
              <TextField
                required
                id="signup_lName"
                name="lastName"
                onChange={handleChange}
                onKeyPress={handlePress}
                label="Last Name"
                inputProps={{ style: { textTransform: "capitalize" } }}
                sx={{ mt: 1, mb: 2, width: "30ch" }}
              />

              {/* FIRST NAME */}
              <TextField
                required
                id="signup_fName"
                name="firstName"
                onChange={handleChange}
                onKeyPress={handlePress}
                label="First Name"
                inputProps={{ style: { textTransform: "capitalize" } }}
                sx={{ mt: 1, mb: 2, width: "30ch" }}
              />

              {/* MIDDLE INITIAL */}
              <TextField
                id="signup_mName"
                name="middleInitial"
                onChange={handleChange}
                onKeyPress={handlePress}
                label="M.I."
                inputProps={{
                  style: { textTransform: "uppercase" },
                  maxLength: 1,
                }}
                sx={{ width: "10ch", mt: 1, mb: 2 }}
              />
            </div>
            <div className="secondRow_field">
              {/* EMAIL */}
              <TextField
                required
                id="signup_email"
                name="email"
                onChange={handleChange}
                label="Email"
                sx={{ mt: 1, mb: 2, width: "45ch" }}
              />

              {/* STUDENT NUMBER */}
              <TextField
                required
                id="signup_sNumber"
                name="studNum"
                onChange={handleChange}
                onKeyPress={handlePress}
                label="Student Number"
                inputProps={{ maxLength: 10 }}
                sx={{ mt: 1, mb: 2, width: "25ch" }}
              />
            </div>
            <div className="other-field">
              {/* YEAR LEVEL */}
              <TextField
                required
                id="signup_yearLvl"
                name="yearLevel"
                onChange={handleChange}
                onKeyPress={handlePress}
                label="Year Level"
                inputProps={{ maxLength: 1 }}
                sx={{ mt: 1, mb: 2, width: "20ch" }}
              />

              {/* SECTION */}
              <TextField
                required
                id="signup_section"
                name="section"
                onChange={handleChange}
                onKeyPress={handlePress}
                label="Section"
                inputProps={{
                  maxLength: 1,
                  style: { textTransform: "uppercase" },
                }}
                sx={{ mt: 1, mb: 2, width: "20ch" }}
              />

              {/* PHONE NUMBER */}
              <TextField
                id="signup_contact"
                name="phoneNum"
                onChange={handleChange}
                onKeyPress={handlePress}
                label="Phone Number"
                inputProps={{ maxLength: 11 }}
                sx={{ mt: 1, mb: 2, width: "30ch" }}
              />
            </div>
            <div className="passwords-field">
              {/* PASSWORD */}
              <FormControl
                sx={{ mt: 1, mb: 2, width: "35ch" }}
                variant="outlined"
                required
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="signup_password"
                  name="password"
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              {/* CONFIRM PASSWORD */}
              <FormControl
                sx={{ mt: 1, mb: 2, width: "35ch" }}
                variant="outlined"
                required
              >
                <InputLabel htmlFor="confirm-password">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="confirm_password"
                  name="confirmPassword"
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
              </FormControl>
            </div>
            <p className="to-signin" onClick={routeChange}>
              Already have an account?
            </p>
            <button className="signup-btn" onClick={routeChange}>
              Sign In
            </button>
          </form>
        </div>
        <div className="img-wrapper">
          <img src={signupIcon} alt="" className="signup_img" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
