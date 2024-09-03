import React from "react";
import image from "../img/khalil.jpg";
import {
  Grid,
  Paper,
  Typography,
  createMuiTheme,
  MuiThemeProvider,
  makeStyles
} from "@material-ui/core";

let theme = createMuiTheme();
theme.typography.h6 = {
  fontSize: "1rem",
  alignItems: "center",
  "@media (min-width:900px)": {
    fontSize: "1.05rem"
  },
  "@media (min-width:1000px)": {
    fontSize: "1.1rem"
  },
  "@media (min-width:1200px)": {
    fontSize: "1.2rem"
  },
  "@media (min-width:1300px)": {
    fontSize: "1.25rem"
  }
};

// Updated user data
const user = {
  id: "se20f-097",
  name: "Khalil Ahmed Sharif",
  email: "se20f-097@ssuet.edu.pk",
  phone: "+92 345 3267208",
};

const mapInformation = {
  id: "ID",
  name: "Name",
  email: "Email",
  phone: "Phone"
};

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#594f8d",
    color: "linear-gradient(135deg, #F9F5FF 0%, #AEC6CF 100%)",
    padding: "1rem",
    width: "50%",
    [theme.breakpoints.down(1200)]: {
      width: "70%"
    },
    [theme.breakpoints.down(1000)]: {
      width: "80%"
    },
    [theme.breakpoints.down(900)]: {
      width: "90%"
    },
    [theme.breakpoints.down(800)]: {
      width: "100%"
    }
  },
  form: {
    backgroundColor: "#135498",
    color: "#F9F5FF ",
    padding: "0.5rem",
    margin: "1rem",
    width: "50%",
    [theme.breakpoints.down(1200)]: {
      width: "70%"
    },
    [theme.breakpoints.down(1000)]: {
      width: "80%"
    },
    [theme.breakpoints.down(900)]: {
      width: "90%"
    },
    [theme.breakpoints.down(800)]: {
      width: "100%"
    }
  },
  profileImage: {
    width: "100%",
    height: "100%"
  }
}));

const UserInfoFormItem = (user, propt, index, classes) => {
  return (
    <Grid
      item
      xs={6}
      key={`display-${index}`}
      container
      direction="column"
      alignItems="center"
    >
      <Paper className={classes.form}>
        <Grid item xs={12}>
          <Typography variant="subtitle1">{mapInformation[propt]}</Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6">{user[propt]}</Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default function Profile() {
  const classes = useStyles();

  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Grid container spacing={2}>
          <Grid item xs={12} container spacing={2}>
            <Grid item sm={6} md={4} align="right">
              <Paper
                style={{ border: "2px solid", height: "200px", width: "200px", backgroundColor: 'linear-gradient(135deg, #F9F5FF 0%, #AEC6CF 100%)' }}
              >
                {/* Display profile picture */}
                <img
                  src={image}
                  alt="Profile"
                  className={classes.profileImage}
                />
              </Paper>
            </Grid>
            <Grid item sm={6} md={8} alignt="left" container>
              <Grid item xs={12} container alignItems="center">
                <Typography variant="h4">{user.name}</Typography>
              </Grid>
            </Grid>
          </Grid>
          {Object.keys(user).map((key, index) =>
            UserInfoFormItem(user, key, index, classes)
          )}
        </Grid>
      </MuiThemeProvider>
    </div>
  );
}
