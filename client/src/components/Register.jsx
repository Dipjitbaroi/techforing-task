import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Import Material-UI icons
import { useRegisterMutation } from "../services/api.config";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const [register] = useRegisterMutation(); // Access register mutation from API

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Call register API
      const response = await register({ name, email, password }).unwrap(); // Unwrap API response
      setSuccess("Registration successful! Redirecting to login...");
      
      // Navigate to the login page after successful registration
      setTimeout(() => {
        navigate("/login");
      }, 1500); // Delay for better user experience
    } catch (err) {
      // Handle API errors
      setError(err?.data?.msg || "Registration failed! Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <TextField
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300 mb-4"
          >
            Register
          </button>
        </form>

        <button
          onClick={() => navigate("/login")}
          className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition duration-300"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default Register;
