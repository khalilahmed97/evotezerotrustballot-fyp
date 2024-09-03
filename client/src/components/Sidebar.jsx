import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../imgs/logo512.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { adminSidebarData, voterSidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Box } from "@material-ui/core";
import { useSelector } from "react-redux";

const sidebarVariants = {
  true: {
    left: '0'
  },
  false: {
    left: '-60%'
  }
};

const Sidebar = () => {
  const {role} = useSelector((state) => state.user)
  const [selected, setSelected] = useState(0);
  const [expanded, setExpaned] = useState(true);

  return (
    <Box width={"300px"}>
      <div
        className="bars"
        style={expanded ? { left: "100%" } : { left: "5%" }}
        onClick={() => setExpaned(!expanded)}
      >
        <UilBars />
      </div>
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={expanded ? "true" : "false"}
      >
        <div className="logo">
          <img src={Logo} alt="logo" />
          <span></span>
        </div>

        <div className="menu">
          {role==="voter" ? (
          voterSidebarData.map((item, index) => (
            <Link
              to={item.path}
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => setSelected(index)}
            >
              <item.icon />
              <span>{item.heading}</span>
            </Link>
          )))

          :

          (adminSidebarData.map((item, index) => (
            <Link
              to={item.path}
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => setSelected(index)}
            >
              <item.icon />
              <span>{item.heading}</span>
            </Link>
          )))

        }
          
          <div className="menuItem">
            {/* <UilSignOutAlt /> */}
          </div>
        </div>
      </motion.div>
    </Box>
  );
};

export default Sidebar;