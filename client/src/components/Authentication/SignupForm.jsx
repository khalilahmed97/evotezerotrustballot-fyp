import React, { useState, useEffect } from 'react';
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
  DialogTitle,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import assets from "../../assets/index";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { ScreenMode } from '../../pages/Authentication/Authentication';
import WebcamComponent from './WebcamComponent';

const SignupForm = ({ onSwitchMode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cnic, setCnic] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [membershipNumber, setMembershipNumber] = useState('');
  const [organization, setOrganization] = useState('');
  const [gender, setGender] = useState('');
  const [open, setOpen] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(assets.images.signupBg);
  const [cnicError, setCnicError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [membershipNumberError, setMembershipNumberError] = useState('');
  const [organizationError, setOrganizationError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [data, setData] = useState({});

  const { message, isSuccess } = useSelector(state => state.user);

  const validateEmail = (userEmail) => {
    const isValidEmail = /^[\w-\.]+@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|live\.com|protonmail\.com|mail\.com|icloud\.com)$/;
    return isValidEmail.test(userEmail);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const isValidPhone = /^\+92\d{10}$/;
    return isValidPhone.test(phoneNumber);
  };

  const submitUser = () => {
    let valid = true;

    if (cnic.length !== 13 || !/^\d+$/.test(cnic)) {
      setCnicError('Invalid CNIC');
      valid = false;
    } else {
      setCnicError('');
    }

    if (!validateEmail(email)) {
      setEmailError('Invalid Email');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!validatePhoneNumber(phone)) {
      setPhoneError('Invalid Number');
      valid = false;
    } else {
      setPhoneError('');
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 digits');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Password did not match');
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (membershipNumber.length === 0) {
      setMembershipNumberError('Membership Number is required');
      valid = false;
    } else {
      setMembershipNumberError('');
    }

    if (organization.length === 0) {
      setOrganizationError('Organization is required');
      valid = false;
    } else {
      setOrganizationError('');
    }

    if (gender.length === 0) {
      setGenderError('Gender is required');
      valid = false;
    } else {
      setGenderError('');
    }

    if (!valid) return;

    const userData = {
      name,
      cnic,
      email,
      password,
      phone,
      membershipNumber,
      organization,
      gender
    };

    setData(userData);
    setOpen(true);
  };

  useEffect(() => {
    const membershipNum = parseInt(membershipNumber); // Ensure membershipNumber is parsed as integer
    if (membershipNum >= 2000 && membershipNum <= 2020) {
      setOrganization('KATI');
    } else if (membershipNum >= 3000 && membershipNum <= 3020) {
      setOrganization('ABAD');
    } else if (membershipNum >= 4000 && membershipNum <= 4020) {
      setOrganization('KCCI');
    } else {
      setOrganization('');
    }
  }, [membershipNumber]);

  const handleCapture = (imageSrc) => {
    console.log('Captured image:', imageSrc);
    setOpen(false);
    onSwitchMode(ScreenMode.SIGN_IN);
  };

  return (
    <Box display="flex" height="100vh">
      <Snackbar
        open={isSuccess}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="success"
          sx={{ width: "100%", fontSize: "14px" }}
        >
          {message}
        </Alert>
      </Snackbar>

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
                Create an account
              </Typography>
              <Typography color={"#12305c"}></Typography>
            </Stack>

            <Stack spacing={1}>
              <Stack spacing={1}>
                <Typography color={"#12305c"} fontSize="13px">Name</Typography>
                <TextField size="small" onChange={(e) => setName(e.target.value)} />
              </Stack>
              <Stack direction="row" spacing={2}>
                <Stack spacing={1} sx={{ flex: 1 }}>
                  <Typography color={"#12305c"} fontSize="13px">CNIC</Typography>
                  <TextField
                    size="small"
                    onChange={(e) => {
                      setCnic(e.target.value);
                      setCnicError('');
                    }}
                    error={!!cnicError}
                    helperText={cnicError}
                  />
                </Stack>
                <Stack spacing={1} sx={{ flex: 1 }}>
                  <Typography color={"#12305c"} fontSize="13px">Phone Number</Typography>
                  <TextField
                    size="small"
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setPhoneError('');
                    }}
                    error={!!phoneError}
                    helperText={phoneError}
                  />
                </Stack>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Stack spacing={1} sx={{ flex: 1 }}>
                  <Typography color={"#12305c"} fontSize="13px">Membership #</Typography>
                  <TextField
                    size="small"
                    onChange={(e) => {
                      const membershipNum = e.target.value;
                      setMembershipNumber(membershipNum);
                      setMembershipNumberError('');
                      if (membershipNum >= 2020001 && membershipNum <= 2020100) {
                        setOrganization('KATI');
                      } else if (membershipNum >= 2020101 && membershipNum <= 2020200) {
                        setOrganization('ABAD');
                      } else if (membershipNum >= 2020201 && membershipNum <= 2020300) {
                        setOrganization('KCCI');
                      } else {
                        setOrganization('');
                      }
                    }}
                    error={!!membershipNumberError}
                    helperText={membershipNumberError}
                  />
                </Stack>
                <Stack spacing={1} sx={{ flex: 1 }}>
                  <Typography color={"#12305c"} fontSize="13px">Organization</Typography>
                  <TextField
                    size="small"
                    value={organization}
                    disabled
                  />
                </Stack>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Stack spacing={1} sx={{ flex: 1 }}>
                  <Typography color={"#12305c"} fontSize="13px">Email</Typography>
                  <TextField
                    size="small"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError('');
                    }}
                    error={!!emailError}
                    helperText={emailError}
                  />
                </Stack>
                <Stack spacing={1} sx={{ flex: 1 }}>
                  <Typography color={"#12305c"} fontSize="13px">Gender</Typography>
                  <FormControl fullWidth size="small">
                    <InputLabel>Select</InputLabel>
                    <Select
                      value={gender}
                      onChange={(e) => {
                        setGender(e.target.value);
                        setGenderError('');
                      }}
                      error={!!genderError}
                      label="Gender"
                    >
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                      <MenuItem value={"Other"}>Other</MenuItem>
                    </Select>
                    {genderError && (
                      <Typography color="error" variant="caption">{genderError}</Typography>
                    )}
                  </FormControl>
                </Stack>
              </Stack>
              <Stack spacing={1}>
                <Typography color={"#12305c"} fontSize="13px">Password</Typography>
                <TextField
                  size="small"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError('');
                  }}
                  error={!!passwordError}
                  helperText={passwordError}
                />
              </Stack>
              <Stack spacing={1}>
                <Typography color={"#12305c"} fontSize="13px">Confirm Password</Typography>
                <TextField
                  size="small"
                  type="password"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setConfirmPasswordError('');
                  }}
                  error={!!confirmPasswordError}
                  helperText={confirmPasswordError}
                />
              </Stack>
            </Stack>
            <Button
              variant='contained'
              size='large'
              sx={{
                bgcolor: "#12305c",
                "&:hover": {
                  bgcolor: "#12305c"
                }
              }}
              onClick={submitUser}
            >
              Sign up
            </Button>
          </Stack>

          <Stack direction="row" spacing={2} mt={2}>
            <Typography>Already have an account?</Typography>
            <Typography
              onClick={() => navigate("/login")}
              fontWeight={600}
              sx={{
                cursor: "pointer",
                userSelect: "none"
              }}
            >
              Sign in
            </Typography>
          </Stack>
        </Box>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        {/* <DialogTitle>Multi Authentication Process</DialogTitle> */}
        <DialogContent>
          <WebcamComponent setOpen={setOpen} currentPage={"signup"} userData={data} />
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

export default SignupForm;
