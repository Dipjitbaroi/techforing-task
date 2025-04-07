import React from "react";
import { Box, Typography, Modal, Button, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

// Default job details as an array
const defaultJobDetails = {
  title: "Default Job Title",
  overview: "This is a default job overview.",
  responsibilities: [
    "Default responsibility 1",
    "Default responsibility 2",
    "Default responsibility 3",
  ],
  requirements: [
    "Default requirement 1",
    "Default requirement 2",
    "Default requirement 3",
  ],
  location: "Default Location",
  salary: "Default Salary",
};

const JobDetailsModal = ({ open, handleClose, jobDetails }) => {
  const details = jobDetails || defaultJobDetails; // Fallback to default data if `jobDetails` is undefined

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="job-details-title"
      aria-describedby="job-details-description"
    >
      <Box sx={style}>
        {/* Close Button */}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: -20,
            right: -20,
            backgroundColor: "#f5f5f5",
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
          }}
        >
          <Close />
        </IconButton>

        {/* Job Details */}
        <Typography id="job-details-title" variant="h6" component="h2">
          {details?.title}
        </Typography>
        <Typography id="job-details-description" sx={{ mt: 2 }}>
          <strong>Overview:</strong> {details?.overview}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Responsibilities:</strong>
          <ul>
            {details?.responsibilities?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Requirements:</strong>
          <ul>
            {details?.requirements?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Location:</strong> {details?.location}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Salary:</strong> {details?.salary}
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 3, width: "100%" }}
          onClick={() => alert("Application Submitted!")}
        >
          Submit Application
        </Button>
      </Box>
    </Modal>
  );
};

export default JobDetailsModal;
