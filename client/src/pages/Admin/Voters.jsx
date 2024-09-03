import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Box, Typography, Paper } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllVoters } from "../../features/voter/voterSlice";

const useStyles = makeStyles({
  tableContainer: {
    borderRadius: "1rem",
    borderColor: "#242d49",
    overflow: "none",
    margin: "1rem",
    background: "#F9F5FF",
    padding: "20px",
    color: "white",
    fontFamily: "Poppins",
    marginTop: "20px",
  },
});

const Voters = ({searchTerm}) => {
  const dispatch = useDispatch()
  const {voters} = useSelector(state => state.voter)

  const columns = [
    { field: "cnic", headerName: "Cnic", width: 300 },
    { field: "name", headerName: "Name", width: 300 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "gender", headerName: "Gender", width: 100 },
    // { field: "genSecVoted", headerName: "General Sec. Voted", width: 150 },
    // { field: "presidentVoted", headerName: "President Voted", width: 150 },
    // { field: "vicePresidentVoted", headerName: "Vice President Voted", width: 150 },
    // { field: "srvicePresidentVoted", headerName: "Sr. Vice President Voted", width: 150 },
    
  ];

  const rows = 
  voters &&
  voters?.filter((val) => {
        if (searchTerm == "") {
          return val;
        } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return val;
        }
      })
      .map((voter) => ({
        id: voter.id,
        name: voter.name,
        cnic: voter.cnic,
        email: voter.email,
        gender: voter.gender,
        genSecVoted: voter.is_gen_sec_voted,
        presidentVoted: voter.is_president_voted,
        vicePresidentVoted: voter.is_vp_voted,
        srvicePresidentVoted: voter.is_sr_vp_voted
       
      }));


      useEffect(() => {
        dispatch(getAllVoters())
      },[])
  return (

    <Box
    sx={{
      color: "white",
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      marginTop: "2rem",
    }}
  >
   

    <div style={{ width: "100%" }}>
      {/* Integrate CourseTable component */}

      <Paper
        elevation={3}
        sx={{
          display: "flex",
          overflow: "hidden",
          borderRadius: 4,
          width: "100%",
        }}
      >
      <Box sx={{ width: "18px", bgcolor: "#074693" }} />
      <Box sx={{ width: "100%" }}>
        {voters && (
          <DataGrid
          sx={{
            height: "62vh",
            "& .MuiDataGrid-columnHeaderTitle": {
              color: "#074693",
              fontWeight: "600 !important",
            },
          }}
          columns={columns}
          rows={rows}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 100]}
          disableSelectionOnClick
        />
        )}
        
      </Box>
    </Paper>
      </div>
    </Box>
  );
};

export default Voters;
