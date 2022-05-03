import express from "express";
const router = express.Router();

import {
  register,
  regstaff,
  login,
  getStudents,
  getEvaluators,
} from "../controllers/authController.js";

router.route("/register").post(register);
router.route("/register/staff").post(regstaff);
router.route("/login").post(login);
router.route("/get-students").get(getStudents);
router.route("/get-evaluators").get(getEvaluators);

export default router;
