import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile"; // Importing Profile component
import { Box } from "@material-ui/core";
import { Badge } from "@mui/material"; // Import Badge component
import NotificationsIcon from "@mui/icons-material/Notifications";
import CallToActionIcon from "@material-ui/icons/CallToAction";
import { Divider } from "@mui/material";
import { Popper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../features/auth/authSlice";

const useStyles = makeStyles((theme) => ({
  navbarItem: {
    position: "relative",
    cursor: "pointer",
    fontFamily: "Poppins",
  },
  avatar: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    marginRight: "10px",
    background: "#135498",
    fontFamily: "Poppins",
  },
  popover: {
    // padding: theme.spacing(2),
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    fontFamily: "Poppins",
  },
  dropdownOption: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    cursor: "pointer",
    fontFamily: "Poppins",
  },
}));

const Navbar = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { role } = useSelector((state) => state.user);
  
  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
    window.location.reload(2);
  };

  const open = Boolean(anchorEl);
  const count = 2;

  return (
    <Box display={"flex"} width={"10%"}>
      {/*
      {role === "admin" ? (
        <Box>
          <IconButton size="large">
            <NotificationsIcon fontSize="large" sx={{ color: "#135498" }} />
          </IconButton>
          <span
            style={{
              display: "block",
              position: "relative",
              right: -15,
              top: -35,
              backgroundColor: "#f50057",
              color: "#fff",
              borderRadius: "50%",
              width: 15,
              height: 15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
            }}
          >
            {count}
          </span>
        </Box>
      ) : (
        <></>
      )}
      */}
      {/* <Box sx={{ marginLeft: "25px" }}>
          <IconButton
            onClick={handlePopoverOpen}
            color="inherit"
            aria-label="user-avatar"
          >
            <Avatar alt="Avatar" />
          </IconButton>
        </Box>
        ) : (
          <></>
       
           )} */}
      <Box sx={{ marginLeft: "25px" }}>
        <IconButton onClick={handleLogout}>
          <ExitToAppIcon alt="log out" fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;
