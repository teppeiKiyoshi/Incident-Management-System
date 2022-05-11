import express from "express";
const router = express.Router();

import {
  add,
  getReports,
  getLatestReports,
  getReport,
  setEvaluator,
  markAsUnres,
  getComments,
  addComment,
  getReportsByKeyword,
  getFilteredReports,
} from "../controllers/reportController.js";

router.route("/add").post(add);
router.route("/get-reports").get(getReports);
router.route("/get-reports-keyword").post(getReportsByKeyword);
router.route("/get-latest-reports").post(getLatestReports);
router.route("/get-filtered-reports").post(getFilteredReports);
router.route("/get-report").post(getReport);
router.route("/set-evaluator").post(setEvaluator);
router.route("/mark-as-unres").post(markAsUnres);
router.route("/get-comments").post(getComments);
router.route("/add-comment").post(addComment);

export default router;
