import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles"; // Import ThemeProvider
import theme from "./theme"; // Import the custom theme
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import JobsPage from "./components/JobsPage";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import { isAuthenticated } from "./utils/auth";

const App = () => {
  return (
    <ThemeProvider theme={theme}> {/* Wrap with ThemeProvider */}
      <Router>
        <Routes>
          {/* Redirect to appropriate page based on authentication */}
          <Route
            path="/"
            element={isAuthenticated() ? <Navigate to="/home" /> : <Navigate to="/login" />}
          />

          {/* Public routes for Login and Register */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* Protected routes */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Navbar /> {/* Navbar displays only on protected pages */}
                <div className="flex">
                  <Sidebar /> {/* Sidebar displays only on protected pages */}
                  <div className="flex-1">
                    <Home />
                  </div>
                </div>
              </PrivateRoute>
            }
          />
          <Route
            path="/jobs"
            element={
              <PrivateRoute>
                <Navbar /> {/* Navbar displays only on protected pages */}
                <div className="flex">
                  <Sidebar /> {/* Sidebar displays only on protected pages */}
                  <div className="flex-1">
                    <JobsPage />
                  </div>
                </div>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
