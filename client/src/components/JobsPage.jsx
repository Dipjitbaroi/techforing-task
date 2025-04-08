import React, { useState } from "react";
import {
  useCreateJobMutation,
  useDeleteJobMutation,
  useGetAllJobsQuery,
  useUpdateJobMutation,
} from "../services/api.config";

const JobsPage = () => {
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
  const [deletingJobId, setDeletingJobId] = useState(null); // New state to track deleting job

  const categories = [
    "Digital Marketing",
    "Development",
    "Sales & Marketing",
    "Engineering",
    "Accounts",
    "Creative",
    "HR & Administration",
  ];

  const {
    data: jobsData,
    isLoading: loadingJobs,
    error: errorJobs,
    refetch,
  } = useGetAllJobsQuery();

  const [createJob, { isLoading: creating, error: createError }] =
    useCreateJobMutation();
  const [updateJob, { isLoading: updating, error: updateError }] =
    useUpdateJobMutation();
  const [deleteJob, { error: deleteError }] = useDeleteJobMutation(); // Renamed isDeleting for clarity

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    if (Object.values(newJob).some((value) => !value)) {
      alert("Please fill out all fields");
      return;
    }
    try {
      await createJob(newJob).unwrap();
      setNewJob({
        title: "",
        description: "",
        location: "",
        category: "",
        overview: "",
        salary: "",
      });
      alert("Job created successfully!");
      refetch();
    } catch (err) {
      console.error("Error creating job:", err);
      alert(
        `Error creating job: ${err?.data?.message || "Something went wrong"}`
      );
    }
  };

  const handleEditJob = (job) => {
    setIsEditing(true);
    setEditJobId(job._id);
    setNewJob({ ...job });
  };

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    try {
      await updateJob({ id: editJobId, updateData: newJob }).unwrap();
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
      refetch();
    } catch (err) {
      console.error("Error updating job:", err);
      alert(
        `Error updating job: ${err?.data?.message || "Something went wrong"}`
      );
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      setDeletingJobId(jobId); // Set the ID of the job being deleted
      try {
        await deleteJob({ id: jobId }).unwrap();
        alert("Job deleted successfully!");
        refetch();
      } catch (err) {
        console.error("Error deleting job:", err);
        alert(
          `Failed to delete job: ${err?.data?.message || "Please try again."}`
        );
      } finally {
        setDeletingJobId(null); // Reset the deleting ID after the attempt
      }
    }
  };

  return (
    <div className="min-h-full p-6 bg-white">
      <h1 className="text-2xl font-bold mb-6">Jobs Management</h1>

      {/* Job Form */}
      <form
        onSubmit={isEditing ? handleUpdateJob : handleAddJob}
        className="mb-6"
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
          <select
            name="location"
            className="p-2 border rounded"
            value={newJob.location}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Location</option>
            <option value="onsite">Onsite</option>
            <option value="remote">Remote</option>
          </select>
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
        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            disabled={creating || updating}
            className={`px-4 py-2 rounded ${
              creating || updating
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
          >
            {creating || updating
              ? isEditing
                ? "Updating Job..."
                : "Adding Job..."
              : isEditing
              ? "Update Job"
              : "Add Job"}
          </button>
          <button
            type="button"
            onClick={() => {
              setNewJob({
                title: "",
                description: "",
                location: "",
                category: "",
                overview: "",
                salary: "",
              });
              setIsEditing(false);
              setEditJobId(null);
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>

      {(createError || updateError || deleteError) && (
        <p className="text-red-500 mb-4">
          Error:{" "}
          {createError?.data?.message ||
            updateError?.data?.message ||
            deleteError?.data?.message ||
            "Something went wrong"}
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
          {loadingJobs ? (
            <tr>
              <td colSpan="7" className="text-center py-4">
                Loading jobs...
              </td>
            </tr>
          ) : errorJobs ? (
            <tr>
              <td colSpan="7" className="text-center py-4 text-red-500">
                Error loading jobs:{" "}
                {errorJobs.message || "Something went wrong"}
              </td>
            </tr>
          ) : jobsData?.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-4">
                No jobs found. Add a new job above!
              </td>
            </tr>
          ) : (
            jobsData?.map((job) => (
              <tr key={job._id} className="text-center">
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
                    onClick={() => handleDeleteJob(job._id)}
                    disabled={deletingJobId === job._id} // Disable only the current deleting button
                    className={`px-2 py-1 rounded text-white ${
                      deletingJobId === job._id
                        ? "bg-red-300 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {deletingJobId === job._id ? "Deleting..." : "Delete"}
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
