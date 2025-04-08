import Job from "../models/job.model.js";

// Create a new job
export const createJob = async (req, res) => {
  const { title, description, location, category, overview, salary } = req.body;

  try {
    const job = new Job({
      title,
      description,
      location,
      category,
      overview,
      salary,
      createdBy: req.user.id,
    });
    console.log(job);

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
    // Extract the user ID from the request (added by checkToken middleware)
    const userId = req.user.id;
    console.log(req.user);

    // Find jobs created by the logged-in user
    const jobs = await Job.find({ createdBy: userId });

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
  const { title, description, location, category, overview, salary } = req.body;
  const { id } = req.params;

  try {
    const job = await Job.findById(id);
    if (!job) return res.status(404).json({ msg: "Job not found" });

    if (title) job.title = title;
    if (description) job.description = description;
    if (location) job.location = location;
    if (category) job.category = category;
    if (overview) job.overview = overview;
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
