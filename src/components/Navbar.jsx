import React, { useState } from "react";
import logo from "../assets/logo.png";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Typography,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  // Handle menu open
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-[#182F59] text-white px-6 py-4 flex justify-between items-center w-full h-fit">
      {/* Hamburger Menu for Small Screens */}

      {/* Logo and Title */}
      <div className="flex items-center">
        <div className="flex">
          <div className="md:hidden">
            <IconButton onClick={toggleSidebar}>
              <MenuIcon style={{ color: "white" }} />
            </IconButton>
          </div>

          <img src={logo} alt="TechForing Logo" className="h-10 w-10 mr-4" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">TechForing</h1>
          <p className="text-xs">Shaping Tomorrows Cybersecurity</p>
        </div>
      </div>

      {/* Profile Section */}
      <div>
        <IconButton onClick={handleMenuOpen}>
          <Avatar alt="DIPJIT BAROI" src="/assets/profile-pic.png" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            style: { width: 300 },
          }}
        >
          {/* User Info */}
          <MenuItem disabled>
            <div className="flex flex-col">
              <Typography variant="subtitle1" fontWeight="bold">
                DIPJIT BAROI
              </Typography>
              <Typography variant="body2" color="textSecondary">
                dipjitbaroiofficial@gmail.com
              </Typography>
            </div>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </nav>
  );
};

export default Navbar;
