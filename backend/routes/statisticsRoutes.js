import express from "express";
const router = express.Router();

import { getStats, getStudDash } from "../controllers/statisticsController.js";

router.route("/getInfo").post(getStats);
router.route("/get-student-dashboard").post(getStudDash);

export default router;
