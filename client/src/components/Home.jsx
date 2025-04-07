import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Box,
} from "@mui/material"; // Import Material-UI components
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Import ExpandMoreIcon
import { LocationCity, Work, WorkOutline } from "@mui/icons-material"; // Import icons for buttons
import JobDetailsModal from "./JobDetailsModal";
import { useGetAllJobsQuery } from "../services/api.config"; // Import the query hook

const Home = () => {
  const [expanded, setExpanded] = useState({});
  const [selectedFilter, setSelectedFilter] = useState("ALL JOBS");
  const [open, setOpen] = useState(false); // Modal open state
  const [selectedJob, setSelectedJob] = useState(null); // Selected job details

  // Fetch jobs dynamically using the query hook
  const { data: jobsData, isLoading, error } = useGetAllJobsQuery();

  const toggleExpand = (category) => {
    setExpanded((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const handleOpen = (job) => {
    setSelectedJob(job);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedJob(null);
  };

  const filteredJobs = () => {
    if (!jobsData) return [];
    if (selectedFilter === "ALL JOBS") return jobsData;
    return jobsData.filter((job) => job.type === selectedFilter); // Assuming 'type' holds filter info like "ONSITE" or "REMOTE"
  };

  const categorizedJobs = () => {
    const categories = {};
    filteredJobs().forEach((job) => {
      if (!categories[job.category]) {
        categories[job.category] = [];
      }
      categories[job.category].push(job);
    });
    return categories;
  };

  if (isLoading) return <p>Loading jobs...</p>;
  if (error) return <p>Error fetching jobs: {error.message}</p>;

  const categories = categorizedJobs();

  return (
    <div>
      <div className="min-h-full min-w-auto bg-white">
        {/* Filter Section */}
        <div className="bg-white p-6 text-center">
          <h2 className="text-3xl font-bold ">BROWSE OPEN POSITIONS</h2>
          <p className="text-md mb-6">
            We are always on the lookout for talented people
          </p>
          <div className="inline-flex border border-black rounded-lg">
            {/* ALL JOBS Button */}
            <Button
              onClick={() => setSelectedFilter("ALL JOBS")}
              style={{
                backgroundColor:
                  selectedFilter === "ALL JOBS" ? "#000000" : "#FFFFFF",
                color: selectedFilter === "ALL JOBS" ? "#FFFFFF" : "#000000",
                borderRadius: "7px 0 0 7px",
                padding: "6px 12px",
                fontSize: "0.875rem",
              }}
            >
              ALL JOBS
            </Button>

            {/* ONSITE Button */}
            <Button
              onClick={() => setSelectedFilter("ONSITE")}
              style={{
                backgroundColor:
                  selectedFilter === "ONSITE" ? "#000000" : "#FFFFFF",
                color: selectedFilter === "ONSITE" ? "#FFFFFF" : "#000000",
                borderRadius: "0",
                padding: "6px 12px",
                fontSize: "0.875rem",
              }}
            >
              ONSITE <LocationCity style={{ marginLeft: "6px" }} />
            </Button>

            {/* REMOTE Button */}
            <Button
              onClick={() => setSelectedFilter("REMOTE")}
              style={{
                backgroundColor:
                  selectedFilter === "REMOTE" ? "#000000" : "#FFFFFF",
                color: selectedFilter === "REMOTE" ? "#FFFFFF" : "#000000",
                borderRadius: "0 7px 7px 0",
                padding: "6px 12px",
                fontSize: "0.875rem",
              }}
            >
              REMOTE <WorkOutline style={{ marginLeft: "6px" }} />
            </Button>
          </div>
        </div>

        <div className="p-6 max-w-7xl mx-auto">
          {Object.entries(categories).map(([category, jobs], index) => (
            <Accordion
              key={index}
              expanded={expanded[category] || false}
              onChange={() => toggleExpand(category)}
              className="mb-4"
              sx={{
                backgroundColor: "#f5f5f5",
                border: "2px solid #0003",
                borderRadius: "8px",
              }}
            >
              <AccordionSummary
                expandIcon={
                  expanded[category] ? (
                    <Typography
                      style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                    >
                      -
                    </Typography>
                  ) : (
                    <Typography
                      style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                    >
                      +
                    </Typography>
                  )
                }
              >
                <Typography
                  variant="h6"
                  style={{ fontWeight: "bold", color: "#00000099" }}
                >
                  {category}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {jobs.map((job, jobIndex) => (
                  <Box
                    key={jobIndex}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    py={1}
                    px={2}
                    sx={{
                      backgroundColor: "white",
                      borderBottom:
                        jobIndex !== jobs.length - 1
                          ? "1px solid #E0E0E0"
                          : "none",
                    }}
                  >
                    <Typography style={{ color: "#333" }}>{job.title}</Typography>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#FFFFFF",
                        "&:hover": {
                          backgroundColor: "#182F59",
                          color: "#FFFFFF",
                        },
                        color: "#000000",
                        borderRadius: "5px",
                        padding: "5px 10px",
                      }}
                      onClick={() => handleOpen(job)}
                    >
                      APPLY NOW
                    </Button>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}

          {/* Job Details Modal */}
          {selectedJob && (
            <JobDetailsModal
              open={open}
              handleClose={handleClose}
              jobDetails={selectedJob}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
