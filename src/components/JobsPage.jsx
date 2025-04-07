import React, { useState } from "react";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({ title: "", description: "", location: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editJobId, setEditJobId] = useState(null);

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  // Add a New Job
  const handleAddJob = (e) => {
    e.preventDefault();
    if (!newJob.title || !newJob.description || !newJob.location) return;
    setJobs([...jobs, { id: Date.now(), ...newJob }]);
    setNewJob({ title: "", description: "", location: "" });
  };

  // Edit a Job
  const handleEditJob = (job) => {
    setIsEditing(true);
    setEditJobId(job.id);
    setNewJob({ title: job.title, description: job.description, location: job.location });
  };

  // Update a Job
  const handleUpdateJob = (e) => {
    e.preventDefault();
    setJobs(
      jobs.map((job) =>
        job.id === editJobId
          ? { id: job.id, title: newJob.title, description: newJob.description, location: newJob.location }
          : job
      )
    );
    setIsEditing(false);
    setEditJobId(null);
    setNewJob({ title: "", description: "", location: "" });
  };

  // Delete a Job
  const handleDeleteJob = (jobId) => {
    setJobs(jobs.filter((job) => job.id !== jobId));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Jobs Management</h1>

      {/* Job Form */}
      <form className="mb-6" onSubmit={isEditing ? handleUpdateJob : handleAddJob}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isEditing ? "Update Job" : "Add Job"}
        </button>
      </form>

      {/* Job Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Location</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No jobs found. Add a new job above!
              </td>
            </tr>
          ) : (
            jobs.map((job) => (
              <tr key={job.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{job.title}</td>
                <td className="border border-gray-300 px-4 py-2">{job.description}</td>
                <td className="border border-gray-300 px-4 py-2">{job.location}</td>
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
