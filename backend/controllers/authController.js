import User from "../models/User.js";
import Staff from "../models/Staff.js";
import Notification from "../models/Notifications.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//------------ REGISTER USER CONTROLLER ------------//
const register = async (req, res) => {
  console.log(req.body);
  let {
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
  const staffAlreadyExists = await Staff.findOne({ email });
  const studNumAlreadyExists = await User.findOne({ studNum });
  const passwordsDontMatch = password === confirmPassword ? false : true;
  const passwordNotEightChars = password.length >= 8 ? false : true;
  const emailNotValid = !validateEmail(email);

  if (userAlreadyExists || staffAlreadyExists)
    return res.json({ status: "error", msg: "Email already in use" });

  if (emailNotValid)
    return res.json({ status: "error", msg: "Email entered is not valid" });

  if (studNumAlreadyExists)
    return res.json({ status: "error", msg: "Student number already exists" });

  if (passwordNotEightChars)
    return res.json({
      status: "error",
      msg: "Password must be at least 8 characters",
    });

  if (passwordsDontMatch)
    return res.json({ status: "error", msg: "Passwords don't match" });

  //Capitalize
  firstName = titleCase(firstName);
  lastName = titleCase(lastName);
  middleInitial = titleCase(middleInitial);

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
  let user;
  let position;

  let studentNotFound = false;
  let staffNotFound = false;

  // Search user first, then staff
  user = await User.findOne({ email: req.body.email });
  if (user == null) studentNotFound = true;
  else position = "student";

  if (studentNotFound) {
    user = await Staff.findOne({ email: req.body.email });
    if (user == null) staffNotFound = true;
    else position = user.position;
  }

  // If no user was found
  if (studentNotFound && staffNotFound)
    return res.json({ status: "error", msg: "There is no such account" });

  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if (isMatch) {
    const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET);

    let details;

    switch (position) {
      case "student":
        details = {
          id: user.id,
          lastName: user.lastName,
          firstName: user.firstName,
          middleInitial: user.middleInitial,
          fullname: `${user.firstName} ${user.middleInitial}. ${user.lastName}`,
          email: user.email,
          studNum: user.studNum,
          yearLevel: user.yearLevel,
          section: user.section,
          phoneNum: user.phoneNum,
          position: position,
          hasReport: user.hasReport,
          profilePic: user.profilePic,
        };
        break;
      default:
        details = {
          id: user.id,
          lastName: user.lastName,
          firstName: user.firstName,
          middleInitial: user.middleInitial,
          fullname: `${user.firstName} ${user.middleInitial}. ${user.lastName}`,
          email: user.email,
          contact: user.contact,
          position: user.position,
          profilePic: user.profilePic,
        };
    }

    return res.json({
      status: "ok",
      details: details,
      token: token,
    });
  } else {
    return res.json({
      status: "error",
      msg: "You entered an incorrect password",
      user: false,
    });
  }
};

//------------ UPDATE PROFILE CONTROLLER ------------//

const updateProfile = async (req, res) => {
  const details = { ...req.body };
  details["firstName"] = titleCase(details.firstName);
  details["lastName"] = titleCase(details.lastName);
  details["middleInitial"] = titleCase(details.middleInitial);

  // Validations
  const emailNotValid = !validateEmail(details.findEmail);
  const userAlreadyExists = await User.findOne({ email: details.email });
  const staffAlreadyExists = await Staff.findOne({ email: details.email });

  if (details.email !== details.findEmail) {
    // Check if email is valid
    if (emailNotValid)
      return res.json({ status: "error", msg: "Email entered is not valid" });

    // Check if email is already in database
    if (userAlreadyExists || staffAlreadyExists)
      return res.json({ status: "error", msg: "Email already in use" });
  }

  // Check if old password has input first, if no input, donn proceed to password validation
  if (details.oldPassword) {
    const user =
      details.position !== "student"
        ? await Staff.findOne({ email: details.findEmail })
        : await User.findOne({ email: details.findEmail });

    // Check if password old password is match
    const isMatch = await bcrypt.compare(details.oldPassword, user.password);

    if (isMatch) {
      if (!details.newPassword || !details.confPassword) {
        return res.json({
          status: "error",
          msg: "Password fields should be filled up",
        });
      }
      // Check if password is new password is 8 chars and greater

      if (details.newPassword.length < 8) {
        return res.json({
          status: "error",
          msg: "Password should be at least 8 characters",
        });
      }

      // Check if password matches conf password
      if (details.newPassword !== details.confPassword) {
        return res.json({
          status: "error",
          msg: "Passwords don't match!",
        });
      }

      // Update password
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(details.newPassword, salt);
      if (details.position !== "student") {
        await Staff.findOneAndUpdate(
          {
            email: details.findEmail,
          },
          {
            password: password,
          }
        );
      } else {
        await User.findOneAndUpdate(
          {
            email: details.findEmail,
          },
          {
            password: password,
          }
        );
      }
    } else {
      return res.json({
        status: "error",
        msg: "Old Password is invalid!",
      });
    }
  }

  try {
    let updated;
    if (details.position !== "student") {
      updated = await Staff.findOneAndUpdate(
        { email: details.findEmail },
        details,
        { new: true }
      );
    } else {
      updated = await User.findOneAndUpdate(
        { email: details.findEmail },
        details,
        { new: true }
      );
    }

    return res.json({ status: "success", updated });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error" });
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
    confirmPassword,
  } = req.body;

  if (
    !lastName ||
    !firstName ||
    !middleInitial ||
    !email ||
    !contact ||
    !password ||
    !confirmPassword
  ) {
    return res.json({ status: "error", msg: "Please provide all values" });
  }

  // VALIDATIONS
  const staffAlreadyExists = await Staff.findOne({ email });
  const userAlreadyExists = await User.findOne({ email });
  const passwordsMatch = password === confirmPassword;
  const emailNotValid = !validateEmail(email);

  if (staffAlreadyExists || userAlreadyExists) {
    return res.json({ status: "error", msg: "Email already in use" });
  }

  if (emailNotValid) {
    return res.json({ status: "error", msg: "Email entered is not valid" });
  }

  if (!passwordsMatch) {
    return res.json({ status: "error", msg: "Passwords don't match" });
  }

  if (passwordsMatch && password.length < 8) {
    return res.json({
      status: "error",
      msg: "Password must be at least 8 characters",
    });
  }

  console.log(passwordsMatch, password.length < 8);

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

//------------ GET CURRENTLY LOGGED IN USER ------------//
const getStudent = async (req, res) => {
  const student = await User.findOne({ email: req.body.email });

  return res.json(student);
};

//------------ GET DETAILS OF USER ------------//
const getStudentDetails = async (req, res) => {
  const student = await User.findById(req.body.userId);

  return res.json(student);
};

//------------ GET ALL USERS ------------//

const getStudents = async (req, res) => {
  const students = await User.find({});
  return res.json(students);
};

//------------ GET ALL EVALUATOR ------------//

const getEvaluators = async (req, res) => {
  const evaluators = await Staff.find({});
  return res.json(evaluators);
};

//------------ GET USER'S NOTIFICATIONS ------------//

const getNotifications = async (req, res) => {
  const notifiedTo = req.body.userId;
  const notifications = await Notification.find({ notifiedTo }).sort({
    createdAt: -1,
  });
  const unseen = await Notification.countDocuments({ notifiedTo, seen: false });

  return res.json({ notifications, unseen });
};

//------------ SEEN ALL USER'S NOTIFICATIONS ------------//

const seenNotifications = async (req, res) => {
  const notifiedTo = req.body.userId;
  const notifications = await Notification.updateMany(
    { notifiedTo },
    { seen: true }
  );
  return res.json({ seen: true });
};

//------------ DELETE EVALUATOR ------------//

const deleteEvaluator = async (req, res) => {
  const id = req.body.userId;
  console.log(id);
  await Staff.findByIdAndDelete(id);
  return res.json({ deleted: true });
};

export {
  register,
  regstaff,
  login,
  updateProfile,
  getStudents,
  getStudent,
  getStudentDetails,
  getEvaluators,
  getNotifications,
  seenNotifications,
  deleteEvaluator,
};

// Extra Functions

function validateEmail(emailAdress) {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAdress.match(regexEmail)) {
    return true;
  } else {
    return false;
  }
}

function titleCase(str) {
  return str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
