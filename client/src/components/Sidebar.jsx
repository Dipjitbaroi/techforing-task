import React from "react";
import { useNavigate } from "react-router-dom";
import { Home as HomeIcon, Work, Description, Menu } from "@mui/icons-material";

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`bg-white text-[#182F59] shadow-xl w-64 min-h-full md:w-20 z-40 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } 
      md:translate-x-0 ${isOpen ? "fixed top-22 left-0" : ""}`} // Absolute on mobile, relative on larger screens
    >
      {/* Sidebar Links */}
      <div className="flex flex-col items-center h-full">
        <button
          onClick={() => navigate("/home")}
          className="mb-6 hover:text-blue-400 flex flex-col items-center py-4"
        >
          <HomeIcon fontSize="large" />
          <span className="text-sm">Home</span>
        </button>

        <button
          onClick={() => navigate("/jobs")}
          className="mb-6 hover:text-blue-400 flex flex-col items-center py-4"
        >
          <Work fontSize="large" />
          <span className="text-sm">Jobs</span>
        </button>

        <button className="mb-6 hover:text-blue-400 flex flex-col items-center py-4">
          <Description fontSize="large" />
          <span className="text-sm">Docs</span>
        </button>

        <button className="hover:text-blue-400 flex flex-col items-center py-4">
          <Menu fontSize="large" />
          <span className="text-sm">More</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
