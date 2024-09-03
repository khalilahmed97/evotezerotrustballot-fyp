import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../../components/Navbar/Navbar";
import Typography from "@material-ui/core/Typography";
import Timer from "../../components/MainDash/Timer";
import SearchBar from "./SearchBar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import candidate1 from "../../imgs/president.jpeg";
import candidate2 from "../../imgs/srvicepresident.jpg";
import candidate3 from "../../imgs/vicepresident.jpg";
import candidate4 from "../../imgs/secetary.jpeg";
// import candidate5 from "../../imgs/srvicepresident.jpeg";
import { Box } from "@mui/material";
const useStyles = makeStyles({
  mainBackground: {
    borderRadius: "2rem",
    overflow: "hidden",
    margin: "20px auto",
    height: "91%",
    padding: "0px",
    backgroundColor: "#dbd7d7",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  },
  headingCard: {
    width: "100%",
    display: "flex",
    margin: "1rem",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardContent: {

    textAlign: "center",
    background: "#135498",
    color: "#F9F5FF",
    fontWeight: "bold",
    borderRadius: "30px",
    margin: "1rem",
    padding: "0rem"
  },
  candidateImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginBottom: "10px",
  },
  textTimesNewRoman: {
    margin: "1rem",
  },
});

const createData = (id, name, email, position, image) => {
  return { id, name, email, position, image };
};

const ShowCandidates = () => {
  const classes = useStyles();

  const [ShowCandidates] = useState([
    createData(1, "Syed Johar Ali Qandhari", "s.joharali@gmail.com", "President", candidate1),
    createData(2, "Nighat Awan", "nighatawan@gmail.com", "Sr. Vice President", candidate2),
    createData(3, "Muslim Mohamedi", "muslimmohammadi@gmail.com", "Vice President", candidate3),
    createData(4, "Nihal Akhtar", "nihalakhtar@gmail.com", "General Secretary", candidate4),
  ]);

  return (
    <Box height={"100vh"} width={"80%"}>
    <Box display={"flex"} justifyContent="space-evenly" alignItems={"center"}>
    <Timer />
  <Navbar/>
    </Box>
      {/* <div className={classes.mainBackground}> */}
        <Card className={classes.headingCard} style={{ backgroundColor: "#F9F5FF", color: "#135498"}}>
          <Typography variant="h4" component="div" className={classes.textTimesNewRoman}>
            Candidates
          </Typography>
          <SearchBar />
        </Card>
        <Grid container spacing={2}>
          {ShowCandidates.slice(0, 7).map((candidate) => (
            <Grid item xs={12} sm={6} md={3} key={candidate.id}>
              <CardContent className={classes.cardContent}>
                <img src={candidate.image} alt="Candidate" className={classes.candidateImage} />
                <Typography variant="h5" component="h2" className={classes.textTimesNewRoman}>
                  ID: {candidate.id}
                </Typography>
                <Typography className={classes.textTimesNewRoman}>
                  Name: {candidate.name}
                </Typography>
                <Typography className={classes.textTimesNewRoman}>
                  Position: {candidate.position}
                </Typography>
              </CardContent>
            </Grid>
          ))}
        </Grid>
      {/* </div> */}
    </Box>
  );
};

export default ShowCandidates;
