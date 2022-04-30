import User from "../models/User.js";
import Staff from "../models/Staff.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//------------ REGISTER USER CONTROLLER ------------//
const register = async (req, res) => {
  console.log(req.body);
  const {
    lastName,
    firstName,
    middleInitial,
    email,
    studNum,
    yearLevel,
    section,
    phoneNum,
    password,
    confirmPassword,
  } = req.body;

  if (
    !lastName ||
    !firstName ||
    !middleInitial ||
    !email ||
    !studNum ||
    !yearLevel ||
    !section ||
    !phoneNum ||
    !password ||
    !confirmPassword
  ) {
    return res.json({
      status: "error",
      msg: "Please fill-up all of the required fields",
    });
  }

  // VALIDATIONS
  const userAlreadyExists = await User.findOne({ email });
  const studNumAlreadyExists = await User.findOne({ studNum });
  const passwordsDontMatch = password === confirmPassword ? false : true;
  const passwordNotEightChars = password.length >= 8 ? false : true;
  const emailNotValid = !validateEmail(email);

  if (userAlreadyExists) {
    return res.json({ status: "error", msg: "Email already in use" });
  }

  if (emailNotValid) {
    return res.json({ status: "error", msg: "Email entered is not valid" });
  }

  if (studNumAlreadyExists) {
    return res.json({ status: "error", msg: "Student number already exists" });
  }

  if (passwordNotEightChars) {
    return res.json({
      status: "error",
      msg: "Password must be at least 8 characters",
    });
  }

  if (passwordsDontMatch) {
    return res.json({ status: "error", msg: "Passwords don't match" });
  }

  //CREATE USER
  const user = await User.create({
    lastName,
    firstName,
    middleInitial,
    email,
    studNum,
    yearLevel,
    section,
    phoneNum,
    password,
  });
  const token = user.createJWT();
  res.json({
    status: "ok",
    user: {
      lastName: user.lastName,
      firstName: user.firstName,
      middleInitial: user.middleInitial,
      email: user.email,
      studNum: user.studNum,
      yearLevel: user.yearLevel,
      section: user.section,
      phoneNum: user.phoneNum,
      password: user.password,
    },
    token,
  });
};

//------------ LOGIN CONTROLLER ------------//
const login = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if (isMatch) {
    const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET);

    const details = {
      fullname: `${user.firstName} ${user.middleInitial}. ${user.lastName}`,
      studNum: user.studNum,
      yearLevel: user.yearLevel,
      section: user.section,
      phoneNum: user.phoneNum,
    };

    return res.json({ status: "ok", details: details, token: token });
  } else {
    return res.json({ status: "error", user: false });
  }
};

//------------ REGISTER EVALUATOR CONTROLLER ------------//
const regstaff = async (req, res) => {
  const {
    lastName,
    firstName,
    middleInitial,
    email,
    contact,
    password,
    position,
  } = req.body;

  if (
    !lastName ||
    !firstName ||
    !middleInitial ||
    !email ||
    !contact ||
    !password
  ) {
    return res.json({ status: "error", msg: "Please provide all values" });
  }

  // VALIDATIONS
  const staffAlreadyExists = await Staff.findOne({ email });
  const userAlreadyExists = await User.findOne({ email });

  if (staffAlreadyExists || userAlreadyExists) {
    return res.json({ status: "error", msg: "Email already in use" });
  }

  //CREATE USER
  const staff = await Staff.create({
    lastName,
    firstName,
    middleInitial,
    email,
    contact,
    password,
    position: "evaluator",
  });
  const token = staff.createJWT();
  res.json({
    status: "ok",
    staff: {
      lastName: staff.lastName,
      firstName: staff.firstName,
      middleInitial: staff.middleInitial,
      email: staff.email,
      contact: staff.contact,
      password: staff.password,
      position: staff.position,
    },
    token: token,
  });
};

export { register, regstaff, login };

// Extra Functions

function validateEmail(emailAdress) {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAdress.match(regexEmail)) {
    return true;
  } else {
    return false;
  }
}
