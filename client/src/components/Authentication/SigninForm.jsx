import {
  Button,
  Stack,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { loginAdmin, loginUser } from '../../features/auth/authSlice';
import WebcamComponent from './WebcamComponent';
import assets from "../../assets/index";

const SigninForm = ({ onSwitchMode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cnic, setCnic] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(assets.images.signupBg);
  const [cnicError, setCnicError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [data, setData] = useState({});
  const { isSuccess } = useSelector(state => state.user);

  const validateFields = () => {
    let isValid = true;
    if (cnic.length !== 13 || !/^\d+$/.test(cnic)) {
      setCnicError('Invalid CNIC');
      isValid = false;
    } else {
      setCnicError('');
    }
    if (password.length < 8) {
      setPasswordError('Invalid Password');
      isValid = false;
    } else {
      setPasswordError('');
    }
    return isValid;
  };

  const handleCnicChange = (e) => {
    setCnic(e.target.value);
    if (e.target.value.length === 13 && /^\d+$/.test(e.target.value)) {
      setCnicError('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length >= 8) {
      setPasswordError('');
    }
  };

  const submitUser = () => {
    if (!validateFields()) {
      return;
    }

    // if (cnic === "4210137949601" && password === "12345678") {
    //   dispatch(loginAdmin());
    // }
    
    
      setData({
        cnic,
        password
      });
      setOpen(true);
  

    
  };

  const handleCapture = (imageSrc) => {
    console.log('Captured image:', imageSrc);
    setOpen(false);
  };

  useEffect(() => {
    
  }, []);

  return (
    <Box display="flex" height="100vh">
      <Box
        width="40%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: "#f5f5f5" }}
      >
        <Box width="100%" maxWidth="400px" p={2}>
          <Stack spacing={2}>
            <Stack>
              <Typography variant='h4' fontWeight={600} color={"#12305c"} marginTop={"20px"}>
                Welcome back
              </Typography>
              <Typography color={"#12305c"}></Typography>
            </Stack>

            <Stack spacing={1}>
              <Stack spacing={1}>
                <Typography color={"#12305c"}>CNIC</Typography>
                <TextField
                  onChange={handleCnicChange}
                  error={!!cnicError}
                  helperText={cnicError}
                />
              </Stack>
              <Stack spacing={1}>
                <Typography color={"#12305c"}>Password</Typography>
                <TextField
                  type="password"
                  onChange={handlePasswordChange}
                  error={!!passwordError}
                  helperText={passwordError}
                />
              </Stack>
            </Stack>
            <Button
              variant='contained'
              size='large'
              sx={{
                fontSize: "20px",
                background: "#12305c",
                "&:hover": {
                  background: "#12305c"
                }
              }}
              onClick={submitUser}
            >
              Sign in
            </Button>
          </Stack>

          <Stack direction="row" spacing={2} mt={2}>
            <Typography>Don't have an account?</Typography>
            <Typography
              onClick={() => navigate("/register")}
              fontWeight={600}
              sx={{
                cursor: "pointer",
                userSelect: "none"
              }}
            >
              Sign up now
            </Typography>
          </Stack>
        </Box>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        {/* <DialogTitle>Multi Authentication Process</DialogTitle> */}
        <DialogContent>
          <WebcamComponent setOpen={setOpen} currentPage={"signin"} userData={data} />
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions> */}
      </Dialog>

      <Box
        width="60%"
        sx={{
          position: "relative",
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh"
        }}
      />
    </Box>
  );
};

export default SigninForm;
