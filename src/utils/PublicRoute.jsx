import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth"; // Authentication utility

const PublicRoute = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/home" /> : children;
};

export default PublicRoute;
