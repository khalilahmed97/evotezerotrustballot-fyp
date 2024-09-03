import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllAcceptedCandidates } from "../../features/candidate/candidateSlice";

const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: "bold",
  fontFamily: "Poppins",
}));

const PositionCard = styled(Card)(({ theme }) => ({
  width: '97%',
  textAlign: 'center',
  background: 'linear-gradient(135deg, #F9F5FF 0%, #AEC6CF 100%)',
  color: '#135498',
  fontFamily: 'Poppins',
  border: '2px solid #135498',
  borderRadius: '20px',
  flexDirection: 'row',
  margin: "0rem",
  marginTop: "-1rem",
  marginBottom: "1rem",
  marginLeft: "auto",
  marginRight: "auto",
}));

const Candidates = ({ searchTerm }) => {
  const { acceptedCandidates } = useSelector((state) => state.candidate);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    dispatch(getAllAcceptedCandidates());
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const columns = [
    { field: "membershipNumber", headerName: "Membership #", width: 200 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "cnic", headerName: "Cnic", width: 150 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "gender", headerName: "Gender", width: 150 },
    { field: "position", headerName: "Position", width: 200 },
  ];

  const filterCandidatesByPosition = (position) => {
    return acceptedCandidates
      .filter((candidate) => {
        if (searchTerm === "") {
          return candidate.position_applied === position;
        } else if (candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          candidate.position_applied === position) {
          return true;
        }
        return false;
      })
      .map((candidate) => ({
        id: candidate.id,
        membershipNumber: candidate.membership_number,
        name: candidate.name,
        cnic: candidate.cnic,
        email: candidate.email_address,
        gender: candidate.gender,
        position: candidate.position_applied,
       
      }));
  };

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
      <PositionCard>
        <StyledTabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="President" />
          <Tab label="Vice President" />
          <Tab label="Sr. Vice President" />
          <Tab label="General Secretary" />
        </StyledTabs>
      </PositionCard>
      <Box sx={{ width: "100%", padding: 0, overflowY: 'hidden' }}>
        {tabValue === 0 && (
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
              <DataGrid
                sx={{
                  height: "57vh",
                  "& .MuiDataGrid-columnHeaderTitle": {
                    color: "#074693",
                    fontWeight: "600 !important",
                  },
                }}
                columns={columns}
                rows={filterCandidatesByPosition("President")}
                pageSize={10}
                rowsPerPageOptions={[10, 25, 100]}
                disableSelectionOnClick
              />
            </Paper>
          </div>
        )}
        {tabValue === 1 && (

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
              <DataGrid
                sx={{
                  height: "57vh",
                  "& .MuiDataGrid-columnHeaderTitle": {
                    color: "#074693",
                    fontWeight: "600 !important",
                  },
                }}
                columns={columns}
                rows={filterCandidatesByPosition("Vice President")}
                pageSize={10}
                rowsPerPageOptions={[10, 25, 100]}
                disableSelectionOnClick
              />
            </Paper>
          </div>
        )}
        {tabValue === 2 && (
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
              <DataGrid
                sx={{
                  height: "57vh",
                  "& .MuiDataGrid-columnHeaderTitle": {
                    color: "#074693",
                    fontWeight: "600 !important",
                  },
                }}
                columns={columns}
                rows={filterCandidatesByPosition("Sr. Vice President")}
                pageSize={10}
                rowsPerPageOptions={[10, 25, 100]}
                disableSelectionOnClick
              />
            </Paper>
          </div>
        )}
        {tabValue === 3 && (
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
              <DataGrid
                sx={{
                  height: "57vh",
                  "& .MuiDataGrid-columnHeaderTitle": {
                    color: "#074693",
                    fontWeight: "600 !important",
                  },
                }}
                columns={columns}
                rows={filterCandidatesByPosition("General Secretary")}
                pageSize={10}
                rowsPerPageOptions={[10, 25, 100]}
                disableSelectionOnClick
              />
            </Paper>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default Candidates;