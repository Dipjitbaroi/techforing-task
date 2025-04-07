import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import jobRoute from "./routes/job.route.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
