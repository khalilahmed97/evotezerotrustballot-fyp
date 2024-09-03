import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Paper,
  Tooltip,
  Button,
  Modal,
  Stack,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllCandidates } from "../../features/candidate/candidateSlice";

const CandidateRegistration = ({ searchTerm }) => {
  const dispatch = useDispatch()
  const {candidates} = useSelector(state => state.candidate)
  const { search } = useLocation();
  const navigate = useNavigate();
  const { cnic } = useParams();




  useEffect(() => {
    dispatch(getAllCandidates())
  }, []);

  const handleViewDetail = (cnic) => {
    navigate(`/request/${cnic}`);
  };

  const columns = [
    { field: "membershipNumber", headerName: "Membership #", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "cnic", headerName: "Cnic", width: 150 },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "position", headerName: "Position", width: 150 },
    {
      field: "detail",
      headerName: "Detail",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          onClick={() => handleViewDetail(params.row.cnic)}
        >
          View Detail
        </Button>

      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <Typography color={params.row.status === "Approve" ? "success.main" : "error.main"}>
          {params.row.status}
        </Typography>
      ),
    },
  ];

  const rows =
    candidates &&
    candidates
      .filter((val) => {
        if (searchTerm === "") {
          return val;
        } else if (val?.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return val;
        }
      })
      .map((candidate) => ({
        id: candidate.id,
        membershipNumber: candidate.membership_number,
        name: candidate.name,
        cnic: candidate.cnic,
        email: candidate.email_address,
        gender: candidate.gender,
        position: candidate.position_applied,
        status: candidate.status,
      }));

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
            {candidates && (
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

export default CandidateRegistration;
