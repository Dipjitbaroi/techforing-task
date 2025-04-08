import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../controllers/job.controller.js";
import { checkToken } from "../middlewares/checkToken.js";

const router = express.Router();

// Create a new job
router.post("/create", checkToken, createJob);

// Get all jobs
router.get("/all", checkToken, getAllJobs);

// Get a single job by ID
router.get("/:id", getJobById);

// Update a job
router.put("/update/:id", checkToken, updateJob);

// Delete a job
router.delete("/delete/:id", checkToken, deleteJob);

export default router;
