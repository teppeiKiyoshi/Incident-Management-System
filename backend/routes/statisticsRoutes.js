import express from "express";
const router = express.Router();

import {
  addFaq,
  getFaqs,
  getStats,
  getStudDash,
  updateFaqs,
  removeFaq,
  getLogo,
  uploadLogo,
} from "../controllers/statisticsController.js";

router.route("/getInfo").post(getStats);
router.route("/get-student-dashboard").post(getStudDash);
router.route("/get-faqs").post(getFaqs);
router.route("/update-faqs").post(updateFaqs);
router.route("/add-faq").post(addFaq);
router.route("/remove-faq").post(removeFaq);
router.route("/get-logo").post(getLogo);
router.route("/upload-logo").post(uploadLogo);

export default router;
