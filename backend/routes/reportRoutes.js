import express from "express";
const router = express.Router();

import { add } from "../controllers/reportController.js";

router.route("/add").post(add);

export default router;
