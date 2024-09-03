import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import Timer from "../../../components/MainDash/Timer";
import Navbar from "../../../components/Navbar/Navbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { Box, Avatar, Paper } from "@mui/material";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  mainBackground: {
    borderRadius: "2rem",
    overflow: "hidden",
    margin: "20px auto",
    height: "85%",
    padding: "0px",
    backgroundColor: "#dbd7d7",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  },
  headingCard: {
    margin: "1rem",
    marginBottom: "0rem",
    width: "96%",
    color: "#135498",
    padding: "1rem",
    borderRadius: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileCard: {
    margin: '0.8rem',
    padding: '0rem',
    borderRadius: "15px",
    width: "96%",
    height: "90%",
    background: "linear-gradient(135deg, #F9F5FF 0%, #AEC6CF 100%)",
  },
  profileCardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "75%",
    margin:"-1rem",
  },
  profileHeader: {
    display: "flex",
    alignItems: "center",
    margin: "0rem",
    marginBottom: "-130px",
    padding: "5rem",
    flexDirection: "column",
  },
  profileImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginBottom: "5px",
  },
  profileText: {
    color: "#000",
    margin: "5px 0",
  },
  detailText: {
    backgroundColor: "#135498",
    padding: "10px",
    borderRadius: "5px",
    color: "#fff",
    textAlign: "center",
  },
  profileDetails: {
    width: "80%",
    marginTop: "20px",
  },
});

const VoterDashboard = () => {
  const classes = useStyles();
  const {user} = useSelector((state) => state.user);

  // Ensure user is defined to avoid rendering issues
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Box height={"80%"} width={"80%"}>
      <Box display={"flex"} justifyContent="space-evenly" alignItems={"center"}>
        <Timer />
        <Navbar />
      </Box>
      <Card className={classes.headingCard}>
        <Typography variant="h4" component="div">
          Dashboard
        </Typography>
      </Card>
      <Paper elevation={3} className={classes.profileCard}>
        <Card className={classes.headingCard}>
          <Typography variant="h4" component="div">
            Voter Details
          </Typography>
        </Card>
        <CardContent className={classes.profileCardContent}>
          <Box className={classes.profileHeader}>
            <Avatar
              src={user.profilePic}
              className={classes.profileImage}
            />
          </Box>
          <Grid container spacing={3} className={classes.profileDetails}>
            <Grid item xs={6}>
              <Typography variant="subtitle1" fontWeight="bold" className={classes.profileText}>
                Name:
              </Typography>
              <Typography variant="body1" className={`${classes.profileText} ${classes.detailText}`}>
                {user.user.name}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" fontWeight="bold" className={classes.profileText}>
                CNIC:
              </Typography>
              <Typography variant="body1" className={`${classes.profileText} ${classes.detailText}`}>
                {user.user.cnic}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" fontWeight="bold" className={classes.profileText}>
                Membership No:
              </Typography>
              <Typography variant="body1" className={`${classes.profileText} ${classes.detailText}`}>
                {user.user.membershipNumber}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" fontWeight="bold" className={classes.profileText}>
                Email Address:
              </Typography>
              <Typography variant="body1" className={`${classes.profileText} ${classes.detailText}`}>
                {user.user.email}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" fontWeight="bold" className={classes.profileText}>
                Gender:
              </Typography>
              <Typography variant="body1" className={`${classes.profileText} ${classes.detailText}`}>
                {user.user.gender}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" fontWeight="bold" className={classes.profileText}>
                Organization:
              </Typography>
              <Typography variant="body1" className={`${classes.profileText} ${classes.detailText}`}>
                {user.user.organization}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Paper>
    </Box>
  );
};

export default VoterDashboard;
