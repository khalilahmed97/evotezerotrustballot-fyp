import React, { useState } from "react";
import {
  Box,
  Paper,
  Grid,
  Typography,
  FormControl,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import Timer from "../../components/MainDash/Timer";
import Navbar from "../../components/Navbar/Navbar";

const CandidateRequestTopBar = ({ searchTerm }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState(searchTerm || "");

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    // Implement your search logic here if needed
    // For now, navigating back to candidate requests page
    navigate("/request");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
        marginBottom={"20px"}
      >
        <Timer />
        <Navbar />
      </Box>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent={"space-between"}
        sx={{
          mb: 2,
        }}
      >
        <Box>
          <Box
            fontFamily={"Poppins"}
            color={"#074693"}
            sx={{
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            Candidate Request
          </Box>
          <Typography fontFamily={"Poppins"}>
            {" "}
            Home / Candidate Request
          </Typography>
        </Box>
        </Grid>
        </Box>
  );
};

export default CandidateRequestTopBar;
