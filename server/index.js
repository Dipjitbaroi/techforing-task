import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // Import the CORS middleware
import userRoutes from "./routes/user.route.js";
import jobRoute from "./routes/job.route.js";

dotenv.config();

const app = express();

// Enable CORS for multiple origins
app.use(
  cors({
    origin: ["http://localhost:5173", "https://techforing-task-mu.vercel.app"],
  })
);

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
