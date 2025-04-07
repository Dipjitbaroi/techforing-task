import express from "express";
import {
  register,
  login,
  deleteUser,
  updateUser,
} from "../controllers/user.controller.js";
import { checkToken } from "../middlewares/checkToken.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.put("/update", checkToken, updateUser);

router.delete("/delete/:id", checkToken, deleteUser);

export default router;