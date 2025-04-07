import React, { useState } from "react";
import {
  useCreateJobMutation,
  useGetAllJobsQuery,
  useUpdateJobMutation,
} from "../services/api.config"; // Import the createJob mutation

const JobsPage = () => {
  const [jobs, setJobs] = useState([]); // Local state for job list (optional if fully API-driven)
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    overview: "",
    salary: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editJobId, setEditJobId] = useState(null);
  const [editJob, setEditJob] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    overview: "",
    salary: "",
  });

  const categories = [
    "Digital Marketing",
    "Development",
    "Sales & Marketing",
    "Engineering",
    "Accounts",
    "Creative",
    "HR & Administration",
  ];

  const { data: jobsData } = useGetAllJobsQuery(); // Fetch jobs from API

  // Hook for creating a new job
  const [createJob, { isLoading, error }] = useCreateJobMutation();
  const [updateJob, { isLoading: updating, error: updateError }] =
    useUpdateJobMutation();

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  // Add a New Job using API
  const handleAddJob = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (
      !newJob.title ||
      !newJob.description ||
      !newJob.location ||
      !newJob.category ||
      !newJob.overview ||
      !newJob.salary
    ) {
      alert("Please fill out all fields");
      return;
    }

    try {
      // Make an API call to create a job
      const response = await createJob(newJob).unwrap(); // Call mutation and unwrap response
      // Optional: Update local state to reflect the newly created job
      setJobs([...jobs, response]);
      // Reset the form
      setNewJob({
        title: "",
        description: "",
        location: "",
        category: "",
        overview: "",
        salary: "",
      });
      alert("Job created successfully!");
    } catch (err) {
      console.error("Error creating job:", err);
    }
  };

  // Edit a Job
  const handleEditJob = (job) => {
    console.log(job);
    setIsEditing(true);
    setEditJobId(job._id); // Set the selected job ID
    setEditJob({
      title: job.title,
      description: job.description,
      location: job.location,
      category: job.category,
      overview: job.overview,
      salary: job.salary,
    });
  };

  const handleUpdateJob = async (e) => {
    e.preventDefault();

    try {
      const response = await updateJob({
        id: editJobId, // Selected job ID
        updateData: editJob, // The updated job data
      }).unwrap();
      console.log(response);
      alert("Job updated successfully!");
      setIsEditing(false);
      setEditJobId(null);
      setNewJob({
        title: "",
        description: "",
        location: "",
        category: "",
        overview: "",
        salary: "",
      });
    } catch (err) {
      console.error("Error updating job:", err);
    }
  };

  // Delete a Job
  const handleDeleteJob = (jobId) => {
    setJobs(jobs.filter((job) => job.id !== jobId));
  };

  return (
    <div className="min-h-full p-6 bg-white">
      <h1 className="text-2xl font-bold mb-6">Jobs Management</h1>

      {/* Job Form */}
      <form
        className="mb-6"
        onSubmit={isEditing ? handleUpdateJob : handleAddJob}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            className="p-2 border rounded"
            value={newJob.title}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Job Description"
            className="p-2 border rounded"
            value={newJob.description}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="p-2 border rounded"
            value={newJob.location}
            onChange={handleInputChange}
            required
          />
          <select
            name="category"
            className="p-2 border rounded"
            value={newJob.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="overview"
            placeholder="Overview"
            className="p-2 border rounded"
            value={newJob.overview}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="salary"
            placeholder="Salary"
            className="p-2 border rounded"
            value={newJob.salary}
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isLoading ? "Adding Job..." : isEditing ? "Update Job" : "Add Job"}
        </button>
      </form>

      {error && (
        <p className="text-red-500">
          Error: {error?.data?.message || "Something went wrong"}
        </p>
      )}

      {/* Job Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Location</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Overview</th>
            <th className="border border-gray-300 px-4 py-2">Salary</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobsData?.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center py-4">
                No jobs found. Add a new job above!
              </td>
            </tr>
          ) : (
            jobsData?.map((job) => (
              <tr key={job.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {job?.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {job?.description}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {job?.location}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {job?.category}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {job?.overview}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {job?.salary}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleEditJob(job)}
                    className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteJob(job.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JobsPage;
