import React, { useState } from "react";
import {
  Menu as MenuIcon,
  Search,
  ArrowDropDownOutlined,
} from "@mui/icons-material";

import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";

import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
} from "@mui/material";

import { show, close } from '../../features/layout/layoutSlice'

const Navbar = ({onLogout}) => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.layout.visible);
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
    onLogout();
  }

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <div className="flex-between">
          <IconButton
            onClick={() =>
              isSidebarOpen === true ? dispatch(close()) : dispatch(show())
            }
          >
            <MenuIcon />
          </IconButton>
          <div className="flex-between">
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-between">
          <div className="flex-between">
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <PersonIcon />
              <Box textAlign="left">
                <Typography fontWeight="bold" fontSize="0.85rem">
                  username
                </Typography>
                <Typography fontSize="0.75rem">occupation</Typography>
              </Box>
              <ArrowDropDownOutlined />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;