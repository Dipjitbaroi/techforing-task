import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Home as HomeIcon, Description, Menu, Work } from "@mui/icons-material";

const Sidebar = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <aside className="bg-white text-[#182F59] shadow-xl w-16 flex flex-col items-center py-6">
      {/* Home Button */}
      <button
        onClick={() => navigate("/home")} // Navigate to the Home page
        className="mb-6 hover:text-blue-400"
      >
        <HomeIcon fontSize="large" />
      </button>

      {/* Jobs Button */}
      <button
        onClick={() => navigate("/jobs")} // Navigate to the Jobs page
        className="mb-6 hover:text-blue-400"
      >
        <Work fontSize="large" />
      </button>

      {/* Description Placeholder */}
      <button className="mb-6 hover:text-blue-400">
        <Description fontSize="large" />
      </button>

      {/* Menu Placeholder */}
      <button className="hover:text-blue-400">
        <Menu fontSize="large" />
      </button>
    </aside>
  );
};

export default Sidebar;
