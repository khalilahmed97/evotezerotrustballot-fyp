import { Search } from "@mui/icons-material";
import {
  Box,
  InputAdornment,
  Paper,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  FormControl,
  IconButton,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Voters from "./Voters"; // Importing the Voters component instead of Candidates
import Navbar from "../../components/Navbar/Navbar";
import Timer from "../../components/MainDash/Timer";

const VoterTopBar = ({ children, hideSearchBar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const activeRole = JSON.parse(localStorage.getItem("activeRole"));

  return (
    <Box sx={{width: "80%", margin: "0 auto"}}>
      <Box display={"flex"} justifyContent="space-evenly" alignItems={"center"} marginBottom={"20px"}>
        <Timer />
        <Navbar/>
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
              fontSize:"25px",
              fontWeight:"bold"
            }}
          >
            Voters
          </Box>
          <Typography fontFamily={"Poppins"}> Home / Voters</Typography>
        </Box>
        <Box sx={{ width: "20%", marginRight: "3rem" }}>
          <Grid
            alignItems="center"
            component={Paper}
            sx={{
              display: "flex",
              width: "300px",
              height: "42px",
              mb: "10px",
              backgroundColor: "white",
              boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.1)",
              borderRadius: "7px",
            }}
          >
            <FormControl
              sx={{ width: "100%" }}
              component="form"
            >
              <TextField
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
                placeholder="Search by Name"
                value={searchTerm}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
                InputLabelProps={{ required: false }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Grid>
        </Box>
      </Grid>
      <Box style={{ width: "100%" }}>
        <Voters searchTerm={searchTerm} /> {/* Calling the Voters component */}
      </Box>
    </Box>
  );
};

export default VoterTopBar;
