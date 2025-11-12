import express from "express";
import { enhanceProSum, enhanceJobDesc, enhanceProdDesc, uploadResume } from "../controllers/aiController.js";
import protect from "../middlewares/authMiddleware.js";

const aiRouter = express.Router();

aiRouter.post("/enhance-pro-sum", protect, enhanceProSum);
aiRouter.post("/enhance-job-desc", protect, enhanceJobDesc);
aiRouter.post("/enhance-prod-desc", protect, enhanceProdDesc);
aiRouter.post("/upload-resume", protect, uploadResume);

export default aiRouter;