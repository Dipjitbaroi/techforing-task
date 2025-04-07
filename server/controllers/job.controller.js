import Job from "../models/job.model.js";

// Create a new job
export const createJob = async (req, res) => {
  const {
    title,
    description,
    location,
    category,
    overview,
    responsibilities,
    requirements,
    salary,
  } = req.body;

  try {
    const job = new Job({
      title,
      description,
      location,
      category,
      overview,
      responsibilities: responsibilities.split(",").map((item) => item.trim()), // Convert comma-separated to array
      requirements: requirements.split(",").map((item) => item.trim()), // Convert comma-separated to array
      salary,
    });

    await job.save();
    res.json({
      msg: "Job created successfully",
      job,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Get a single job by ID
export const getJobById = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await Job.findById(id);
    if (!job) return res.status(404).json({ msg: "Job not found" });

    res.json(job);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Update a job
export const updateJob = async (req, res) => {
  const {
    title,
    description,
    location,
    category,
    overview,
    responsibilities,
    requirements,
    salary,
  } = req.body;
  const { id } = req.params;

  try {
    const job = await Job.findById(id);
    if (!job) return res.status(404).json({ msg: "Job not found" });

    if (title) job.title = title;
    if (description) job.description = description;
    if (location) job.location = location;
    if (category) job.category = category;
    if (overview) job.overview = overview;
    if (responsibilities)
      job.responsibilities = responsibilities.split(",").map((item) => item.trim());
    if (requirements)
      job.requirements = requirements.split(",").map((item) => item.trim());
    if (salary) job.salary = salary;

    await job.save();

    res.json({
      msg: "Job updated successfully",
      job,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete a job
export const deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await Job.findById(id);
    if (!job) return res.status(404).json({ msg: "Job not found" });

    await job.deleteOne();

    res.json({ msg: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
