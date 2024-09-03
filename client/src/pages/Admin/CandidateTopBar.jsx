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
import Candidates from "./Candidates";
import Navbar from "../../components/Navbar/Navbar";
import Timer from "../../components/MainDash/Timer";
const CandidateTopBar = ({ children, hideSearchBar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const activeRole = JSON.parse(localStorage.getItem("activeRole"));

  
  return (
    <Box sx={{width: "80%"}}>
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
          //   position: "sticky",
          //   display: "flex",
          //   justifyContent: "flex-start",
          //   alignItems: "center",
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
            Candidates
            </Box>
          <Typography fontFamily={"Poppins"}> Home / Candidates</Typography>
        </Box>
        <Box sx={{ width: "20%", marginRight: "3rem" }}>
          <Grid
            alignItems="center"
            component={Paper}
            sx={{
              // border: "1px solid red",
              display: "flex",
              // position: "fixed",
              width: "300px",
              height: "42px",
              // maxWidth: "70rem",
              mb: "10px",
              backgroundColor: "white",
              boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.1)",
              borderRadius: "7px",
            }}
          >
            <FormControl
              sx={{ width: "100%" }}
              component="form"
              // onSubmit={}
            >
              <TextField
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
                placeholder="Search by name"
                value={searchTerm}
                // required
                id="Search"
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
        <Candidates searchTerm={searchTerm} />
      </Box>
    </Box>
  );
};

export default CandidateTopBar;
