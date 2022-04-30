import express from "express";
const router = express.Router();

import { getStats } from "../controllers/statisticsController.js";

router.route("/getInfo").post(getStats);

export default router;
