import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Box,
} from "@mui/material"; // Import Material-UI components
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Import ExpandMoreIcon
import { LocationCity, Work, WorkOutline } from "@mui/icons-material";
import JobDetailsModal from "./JobDetailsModal";

const Home = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState({});
  const [selectedFilter, setSelectedFilter] = useState("ALL JOBS");
  const [open, setOpen] = useState(false); // Modal open state
  const [selectedJob, setSelectedJob] = useState(null); // Selected job details

  // Array of jobs categorized by field
  const jobData = [
    {
      category: "Digital Marketing",
      jobs: [
        "SEO Specialist",
        "Social Media Manager",
        "Content Strategist",
        "Paid Ads Campaign Manager",
        "Email Marketing Specialist",
      ],
    },
    {
      category: "Development",
      jobs: [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "Mobile App Developer",
        "Game Developer",
      ],
    },
    {
      category: "Sales & Marketing",
      jobs: [
        "Sales Executive",
        "Brand Manager",
        "Market Research Analyst",
        "Digital Advertising Specialist",
        "Business Development Manager",
      ],
    },
    {
      category: "Engineering",
      jobs: [
        "Cybersecurity Engineer",
        "Network Engineer",
        "Hardware Engineer",
        "Data Engineer",
        "Systems Engineer",
      ],
    },
    {
      category: "Accounts",
      jobs: [
        "Financial Analyst",
        "Accountant",
        "Accounts Payable Specialist",
        "Accounts Receivable Specialist",
        "Tax Consultant",
      ],
    },
    {
      category: "Creative",
      jobs: [
        "Graphic Designer",
        "Video Editor",
        "Illustrator",
        "UI/UX Designer",
        "Creative Director",
      ],
    },
    {
      category: "HR & Administration",
      jobs: [
        "HR Manager",
        "Recruitment Specialist",
        "Training Coordinator",
        "Office Administrator",
        "Compensation Analyst",
      ],
    },
  ];

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
                  selectedFilter === "ALL JOBS" ? "#000000" : "#FFFFFF", // Black for selected, white for unselected
                color: selectedFilter === "ALL JOBS" ? "#FFFFFF" : "#000000", // White text for selected, black text for unselected
                borderRadius: "7px 0 0 7px", // Rounded left for first button
                padding: "6px 12px", // Reduced padding for smaller buttons
                fontSize: "0.875rem", // Slightly smaller font size
              }}
            >
              ALL JOBS
            </Button>

            {/* ONSITE Button */}
            <Button
              onClick={() => setSelectedFilter("ONSITE")}
              style={{
                backgroundColor:
                  selectedFilter === "ONSITE" ? "#000000" : "#FFFFFF", // Black for selected, white for unselected
                color: selectedFilter === "ONSITE" ? "#FFFFFF" : "#000000", // White text for selected, black text for unselected
                borderRadius: "0", // No rounding for middle button
                padding: "6px 12px", // Reduced padding for smaller buttons
                fontSize: "0.875rem", // Slightly smaller font size
              }}
            >
              ONSITE
              <LocationCity style={{ marginLeft: "6px" }} />{" "}
              {/* Icon after text */}
            </Button>

            {/* REMOTE Button */}
            <Button
              onClick={() => setSelectedFilter("REMOTE")}
              style={{
                backgroundColor:
                  selectedFilter === "REMOTE" ? "#000000" : "#FFFFFF", // Black for selected, white for unselected
                color: selectedFilter === "REMOTE" ? "#FFFFFF" : "#000000", // White text for selected, black text for unselected
                borderRadius: "0 7px 7px 0", // Rounded right for last button
                padding: "6px 12px", // Reduced padding for smaller buttons
                fontSize: "0.875rem", // Slightly smaller font size
              }}
            >
              REMOTE
              <WorkOutline style={{ marginLeft: "6px" }} />{" "}
              {/* Icon after text */}
            </Button>
          </div>
        </div>

        <div className="p-6 max-w-7xl mx-auto">
          {jobData.map((item, index) => (
            <Accordion
              key={index}
              expanded={expanded[item.category] || false} // Manage expansion state
              onChange={() => toggleExpand(item.category)} // Toggle expansion
              className="mb-4"
              sx={{
                backgroundColor: "#f5f5f5",
                border: "2px solid #0003",
                borderRadius: "8px",
              }}
            >
              <AccordionSummary
                expandIcon={
                  expanded[item.category] ? (
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
                  {item.category}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {item.jobs.map((job, jobIndex) => (
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
                        jobIndex !== item.jobs.length - 1
                          ? "1px solid #E0E0E0"
                          : "none",
                    }}
                  >
                    <Typography style={{ color: "#333" }}>{job}</Typography>
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
                      onClick={() => handleOpen(job)} // Open modal with job details
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
