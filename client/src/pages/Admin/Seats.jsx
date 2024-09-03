import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Navbar from "../../components/Navbar/Navbar";
import Timer from "../../components/MainDash/Timer";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  tabs: {
    marginBottom: theme.spacing(3),
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  positionCard: {
    width: '97%',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #F9F5FF 0%, #AEC6CF 100%)',
    color: '#135498',
    fontFamily: 'Poppins',
    border: '2px solid #135498',
    borderRadius: '20px',
    flexDirection: 'row',
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
}));

const Seats = () => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const [selectedPosition, setSelectedPosition] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSelectedPosition(null); // Reset selected position when tab changes
  };

  const handlePositionSelect = (position) => {
    setSelectedPosition(position); // Set selected position
  };

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
    <Navbar/>
      </Box>

      {/* Analytics title */}
      <Box
        fontFamily={"Poppins"}
        color={"#074693"}
        sx={{
          fontSize: "25px",
          marginTop:"20px",
          fontWeight: "bold",
          textAlign: "left", // Center align the title
        }}
      >
        Seats
      </Box>
      <Typography fontFamily={"Poppins"} textAlign="left"> Home / Seats</Typography>
      <Card className={classes.positionCard} style={{ background: 'linear-gradient(135deg, #F9F5FF 0%, #AEC6CF 100%)' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          className={classes.tabs}
        >
          {seatData.map((seat, index) => (
            <Tab key={index} label={seat.position} onClick={() => handlePositionSelect(seat.position)} />
          ))}
        </Tabs>
      </Card>
      {selectedPosition !== null && (
        <Card className={classes.card}>
          <CardContent>
              <Typography variant="h4" className={classes.seatInfo}>
                Number of Candidates: {seatData.find(item => item.position === selectedPosition).number_of_candidates}
              </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Seats;