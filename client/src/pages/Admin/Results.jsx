import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Navbar from "../../components/Navbar/Navbar";
import { Paper } from "@material-ui/core";
import Timer from "../../components/MainDash/Timer";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllAcceptedCandidates } from "../../features/candidate/candidateSlice";

const useStyles = makeStyles((theme) => ({
  tabs: {
    marginBottom: theme.spacing(3),
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  positionCard: {
    width: "97%",
    textAlign: "center",
    background: "linear-gradient(135deg, #F9F5FF 0%, #AEC6CF 100%)",
    color: "#135498",
    fontFamily: "Poppins",
    border: "2px solid #135498",
    borderRadius: "5px",
    flexDirection: "row",
    margin: "1rem",
    marginTop: "1rem",
    marginBottom: "1rem",
    marginLeft: "auto",
    marginRight: "auto",
  },
  seatInfo: {
    textAlign: "center",
    padding: theme.spacing(2),
    fontFamily: "Poppins",
  },
  card: {
    marginTop: theme.spacing(2),
  },
  generateButton: {
    backgroundColor: "#135498",
    color: "#F9F5FF",
    fontFamily: "Poppins",
    fontWeight: "bold",
    '&:hover': {
      backgroundColor: "#0e3e75",
    },
  },
  cardContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100px",
  },
}));

const Results = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { acceptedCandidates } = useSelector((state) => state.candidate);
  const [tabValue, setTabValue] = useState(0);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    dispatch(getAllAcceptedCandidates());
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSelectedPosition(null); // Reset selected position when tab changes
  };

  const handlePositionSelect = (position) => {
    setSelectedPosition(position); // Set selected position
  };

  const handleGenerateResult = () => {
    setShowResults(true);
  };

  const columns = [
    { field: "membershipNumber", headerName: "Membership Number", width: 200 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "cnic", headerName: "Cnic", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "gender", headerName: "Gender", width: 150 },
    { field: "position", headerName: "Position", width: 150 },
    { field: "totalVotes", headerName: "Total Votes", width: 140 },
  ];

  const rows = acceptedCandidates
    ?.filter((val) => {
      if (!selectedPosition) return false;
      return val.position_applied === selectedPosition;
    })
    .map((candidate) => ({
      id: candidate.id,
      membershipNumber: candidate.membership_number,
      name: candidate.name,
      cnic: candidate.cnic,
      email: candidate.email_address,
      gender: candidate.gender,
      position: candidate.position_applied,
      totalVotes: candidate.votes
    }));

  const seatData = [
    { position: "President", number_of_candidates: 3 },
    { position: "Sr. Vice President", number_of_candidates: 3 },
    { position: "Vice President", number_of_candidates: 2 },
    { position: "General Secretary", number_of_candidates: 3 },
  ];

  return (
    <Box height={"100vh"} width={"80%"}>
      <Box display={"flex"} justifyContent="space-evenly" alignItems={"center"}>
        <Timer />
        <Navbar />
      </Box>

      {/* Analytics title */}
      <Box
        fontFamily={"Poppins"}
        color={"#074693"}
        sx={{
          fontSize: "25px",
          marginTop: "20px",
          fontWeight: "bold",
          textAlign: "left", // Center align the title
        }}
      >
        Results
      </Box>
      <Typography fontFamily={"Poppins"} textAlign="left">
        {" "}
        Home / Results
      </Typography>
      <Card
        className={classes.positionCard}
        style={{ background: "linear-gradient(135deg, #F9F5FF 0%, #AEC6CF 100%)" }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          className={classes.tabs}
        >
          {seatData.map((seat, index) => (
            <Tab
              key={index}
              label={seat.position}
              onClick={() => handlePositionSelect(seat.position)}
            />
          ))}
        </Tabs>
      </Card>
      {selectedPosition !== null && (
        <>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Button
                className={classes.generateButton}
                variant="contained"
                onClick={handleGenerateResult}
              >
                Generate Result
              </Button>
            </CardContent>
          </Card>
          {showResults && acceptedCandidates && (
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
                    height: "41vh",
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

              </Paper>
            </div>
          )}
        </>

      )}
    </Box>
  );
};

export default Results;
