import express from "express";
const router = express.Router();

import {
  add,
  getReports,
  getLatestReports,
  getReport,
  getUserReports,
  setEvaluator,
  markAsUnres,
  getComments,
  addComment,
  getReportsByKeyword,
  getFilteredReports,
  markAsHelpful,
  getReportsByKeywordAutocomplete,
} from "../controllers/reportController.js";

router.route("/add").post(add);
router.route("/get-reports").get(getReports);
router.route("/get-reports-keyword").post(getReportsByKeyword);
router.route("/reports-autocomplete").post(getReportsByKeywordAutocomplete);
router.route("/get-latest-reports").post(getLatestReports);
router.route("/get-filtered-reports").post(getFilteredReports);
router.route("/get-report").post(getReport);
router.route("/get-user-reports").post(getUserReports);
router.route("/set-evaluator").post(setEvaluator);
router.route("/mark-as-unres").post(markAsUnres);
router.route("/get-comments").post(getComments);
router.route("/add-comment").post(addComment);
router.route("/mark-as-helpful").post(markAsHelpful);

export default router;
