import express from "express";
const router = express.Router();

import {
  register,
  regstaff,
  login,
  updateProfile,
  getStudents,
  getStudent,
  getEvaluators,
  getNotifications,
  seenNotifications,
} from "../controllers/authController.js";

router.route("/register").post(register);
router.route("/register/staff").post(regstaff);
router.route("/login").post(login);
router.route("/update-profile").post(updateProfile);
router.route("/get-student").post(getStudent);
router.route("/get-students").get(getStudents);
router.route("/get-evaluators").get(getEvaluators);
router.route("/get-notifications").post(getNotifications);
router.route("/seen-notifications").post(seenNotifications);

export default router;
