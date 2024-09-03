import { Box, Grid } from '@mui/material';
import React, { useState } from 'react';
import assets from "../../assets";
import SigninForm from '../../components/Authentication/SigninForm';
import SignupForm from '../../components/Authentication/SignupForm';
import {Snackbar, Alert} from "@mui/material"
import { useSelector } from 'react-redux';
export const ScreenMode = {
  SIGN_IN: "SIGN_IN",
  SIGN_UP: "SIGN_UP"
};

const Authentication = ({currentPage}) => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState("unset");
  const [width, setWidth] = useState(0);
  
  const {
    message,
    isSuccess
  } = useSelector( state => state.user)

  const [backgroundImage, setBackgroundImage] = useState(assets.images.signinBg);
  const [currMode, setCurrMode] = useState(currentPage);

  const onSwitchMode = (mode) => {
    setWidth("500px");

    const timeout1 = setTimeout(() => {
      setCurrMode(mode);
      setBackgroundImage(mode === ScreenMode.SIGN_IN ? assets.images.signinBg : assets.images.signupBg);
    }, 1000);

    const timeout2 = setTimeout(() => {
      setLeft("unset");
      setRight(0);
      setWidth(0);
    }, 1200);

    const timeout3 = setTimeout(() => {
      setRight("unset");
      setLeft(0);
    }, 2500);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  };

  return (

    <Box>
       <Snackbar
        open={isSuccess}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
        <Alert
          // onClose={() => setEmptyListError(false)}
          severity="success"
          sx={{ width: "100%", fontSize:"14px"}}
        >
          {message}
        </Alert>
      </Snackbar>
 
    <Grid container sx={{ height: "100vh"}}>
     
      <Grid item xs={4} sx={{ position: "relative", padding: 3 }}>
        {
          currMode === ScreenMode.SIGN_IN ? (
            <SigninForm  />
          ) : (
            <SignupForm />
          )
        }
        

      <Box sx={{
        position: "absolute",
        top: 0,
        left: left,
        right: right,
        width: `${width}%`,
        height: "100%",
        backgroundColor: "#14305c",
        backgroundImage: `url('src/assets/images/img1.jpg')`, // Use backticks (`) for template literals
        transition: "all 1s ease-in-out"
      }} />
      </Grid>
      <Grid item xs={8} sx={{
        position: "relative",
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}>
        <Box sx={{
  position: "absolute",
  top: 0,
  left: left,
  right: right,
  width: `${width}%`,
  height: "100%",
  backgroundColor: "#5ce6e0",  // Add quotation marks around the color value
  transition: "all 1s ease-in-out"
}} />

      </Grid>
    </Grid>

    </Box>
  );
};

export default Authentication;