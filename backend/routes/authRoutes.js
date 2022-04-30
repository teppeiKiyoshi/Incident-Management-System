import express from "express";
const router = express.Router();

import { register, regstaff, login } from "../controllers/authController.js";

router.route("/register").post(register);
router.route("/register/staff").post(regstaff);
router.route("/login").post(login);

export default router;
