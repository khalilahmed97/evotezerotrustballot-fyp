import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Timer from "../MainDash/Timer";
import Navbar from "../Navbar/Navbar";
import Cards from "../Cards/Cards"; // Import your Cards component
import Table from "../Table/Table"; // Import your Table component
import Card from "@mui/material/Card";
import { Box } from "@material-ui/core";
const useStyles = makeStyles({
  mainBackground: {
    alignItems:"space-between",
    borderRadius: "1rem",
    margin: "20px auto",
    height: "84%",
    width: "100%",
    padding: "20px", // Set padding here
    backgroundColor: "#F9F5FF",
    // boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  },
  headingCard: {
    width: "100%",
    color: "#135498",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headingCard2: {
    width: "100%",
    color: "#135498",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardContent: {
    textAlign: "left",
    color: "#135498",
    height: "auto",
    width: "100%",    
    fontWeight: "bold",
    borderRadius: "30px",
    margin: "1.5rem",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#135498", // Add background color here
  },
  candidateImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginRight: "20px",
  },
  textTimesNewRoman: {
    margin: "1rem",
    color: "#135498",
    display: "flex",
    alignItems: "center",
  },
  textTimesNewRoman1: {
    margin: "1rem",
    color: "#135498",
    display: "flex",
    alignItems: "center",
  },
  searchBarContainer: {
    marginLeft: "auto", // Push SearchBar to the right
  },
  votingRateCard: {
    margin: '0.8rem',
    padding: '1rem',
    background: "#135498",
    borderRadius: "10px",
  },
});

const MainDash = () => {  
  const classes = useStyles();
  return (
    <Box height={"100vh"} width={"80%"}>
      <Box display={"flex"} justifyContent="space-evenly" alignItems={"center"}>
      <Timer />
    <Navbar/>
      </Box>
 
      <div className={classes.mainBackground}>
        <Card className={classes.headingCard}>
          <Typography variant="h4" component="div" className={classes.textTimesNewRoman1}>
            Dashboard
          </Typography>
        </Card> 
        <Card className={classes.cards} style={{ margin: '0.8rem', padding: '2rem', background: "#135498", width: "96%", borderRadius: '15px',}}>       
          <Cards /> {/* Call your Cards component here */}
        </ Card>  
        {/* <Card style={{borderRadius: "10px", padding: '1rem', width: "100%", background: "#F9F5FF", overflowY: 'auto' }}>
            <Card className={classes.headingCard2}>
              <Typography variant="h4" component="div" className={classes.textTimesNewRoman}>
                History
              </Typography>
              <div className={classes.searchBarContainer}>
                <SearchBar /> {/* Call your SearchBar component here */}
              </div>
            {/* </Card> */}
            {/* <Table /> */}
        {/* </Card> */}
      {/* </div> */}
    </Box>
  );
};
export default MainDash;