import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

const Home = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState({});

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const categories = [
    "Digital Marketing",
    "Development",
    "Sales & Marketing",
    "Engineering",
    "Accounts",
    "Creative",
    "HR & Administration",
  ];

  const toggleExpand = (category) => {
    setExpanded((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div>
      <div className="min-h-screen bg-white">
        {/* Filter Section */}
        <div className="bg-white p-6 text-center">
          <h2 className="text-3xl font-bold mb-4">BROWSE OPEN POSITIONS</h2>
          <p className="text-gray-600 mb-6">
            We are always on the lookout for talented people.
          </p>
          <div className="space-x-4">
            <button className="px-4 py-2 bg-black text-white rounded">
              ALL JOBS
            </button>
            <button className="px-4 py-2 bg-black text-white rounded">
              ONSITE
            </button>
            <button className="px-4 py-2 bg-black text-white rounded">
              REMOTE
            </button>
          </div>
        </div>

        {/* Job Categories Section */}
        <div className="p-6">
          {categories.map((category, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => toggleExpand(category)}
                className="flex items-center justify-between w-full px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                <span>{category}</span>
                <span>{expanded[category] ? "-" : "+"}</span>
              </button>
              {expanded[category] && (
                <div className="px-4 py-2 border border-gray-300 mt-2 rounded bg-gray-50">
                  <p>Details about {category} jobs.</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className="text-center mt-6">
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
