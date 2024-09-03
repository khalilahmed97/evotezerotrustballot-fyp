import React, { useState, useEffect } from 'react';
import {
  Button,
  Stack,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import assets from "../../assets/index";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { registerCandidate } from '../../features/candidate/candidateSlice';

const CandidateRegistration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { message } = useSelector(state => state.candidate);
  const [cnic, setCnic] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [membershipNumber, setMembershipNumber] = useState('');
  const [organization, setOrganization] = useState('');
  const [position, setPosition] = useState('');
  const [pic, setPic] = useState(null);
  const [cnicPic, setCnicPic] = useState({ front: null, back: null });

  const [cnicFrontFileName, setCnicFrontFileName] = useState('');
  const [cnicBackFileName, setCnicBackFileName] = useState('');
  const [picFileName, setPicFileName] = useState('');

  const [step, setStep] = useState(1);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(assets.images.signupBg);
  const [cnicError, setCnicError] = useState('');
  const [emailError, setEmailError] = useState('');

  const positions = [
    { value: '', label: 'Select' },
    { value: 'President', label: 'President' },
    { value: 'Sr. Vice President', label: 'Sr. Vice President' },
    { value: 'Vice President', label: 'Vice President' },
    { value: 'General Secretary', label: 'General Secretary' },
  ];

  const validateEmail = (userEmail) => {
    const isValidEmail = /^[\w-\.]+@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|live\.com|protonmail\.com|mail\.com|icloud\.com)$/;
    return isValidEmail.test(userEmail);
  };

  useEffect(() => {
    const membershipNumberInt = parseInt(membershipNumber, 10);
    if (membershipNumberInt >= 2000 && membershipNumberInt <= 2020) {
      setOrganization('KATI');
    } else if (membershipNumberInt >= 3000 && membershipNumberInt <= 3020) {
      setOrganization('ABAD');
    } else if (membershipNumberInt >= 4000 && membershipNumberInt <= 4020) {
      setOrganization('KCCI');
    } else {
      setOrganization('');
    }
  }, [membershipNumber]);

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

    if (!position) {
      valid = false;
      alert('Please select a position');
    }

    if (!valid) return;

    setStep(2);
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    const fileTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (file && fileTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        const buffer = reader.result;
        if (type === 'pic') {
          setPic(buffer);
          setPicFileName(file.name);
        } else if (type === 'cnicFront') {
          setCnicPic(prevState => ({ ...prevState, front: buffer }));
          setCnicFrontFileName(file.name);
        } else if (type === 'cnicBack') {
          setCnicPic(prevState => ({ ...prevState, back: buffer }));
          setCnicBackFileName(file.name);
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid image file (jpg or png).');
    }
  };

  const formSubmission = () => {
    dispatch(registerCandidate({
      cnic,
      name,
      email,
      gender,
      membershipNumber,
      organization,
      position,
      pic,
      cnicPic
    }));

    setShowSnackbar(true);
  };

  const handleBackToHomepage = () => {
    navigate('/');
    window.location.reload();
  };

  return (
    <Box display="flex" height="100vh">
      <Snackbar
        open={showSnackbar}
        autoHideDuration={10000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={message === "Candidate Form Submitted Successfully!" ? "success" : "error"} sx={{ width: '100%', fontSize: '14px' }}>
          {message}
        </Alert>
      </Snackbar>
      <Stack
        justifyContent="center"
        alignItems="center"
        width="40%"
        sx={{
          height: '100%',
          backgroundColor: '#f5f5f5',
          padding: '20px',
        }}
      >
        {showSnackbar ? (
          <Stack spacing={4} alignItems="center">
            <Typography
              variant="h6"
              fontWeight={600}
              color="#12305c"
              textAlign="center"
              marginTop="20px"
            >
              {message === "Candidate Form Submitted Successfully!" ? "Your Form has been submitted to Admin." : message}
            </Typography>
            <Button
              variant="contained"
              sx={{ bgcolor: '#12305c', '&:hover': { bgcolor: '#12305c' } }}
              onClick={handleBackToHomepage}
            >
              Back to Homepage
            </Button>
          </Stack>
        ) : (
          <Stack spacing={5} maxWidth="500px" width="100%">
            {step === 1 && (
              <Stack spacing={2}>
                <Typography variant="h4" fontWeight={600} color="#12305c">
                  Candidate Registration
                </Typography>
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="CNIC"
                    variant="outlined"
                    onChange={(e) => {
                      setCnic(e.target.value);
                      setCnicError('');
                    }}
                    error={!!cnicError}
                    helperText={cnicError}
                  />
                  <TextField
                    fullWidth
                    label="Membership#"
                    variant="outlined"
                    onChange={(e) => setMembershipNumber(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError('');
                    }}
                    error={!!emailError}
                    helperText={emailError}
                  />
                  <FormControl fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      variant="outlined"
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Organization</InputLabel>
                    <Select
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      disabled
                      variant="outlined"
                    >
                      <MenuItem value="KATI">KATI</MenuItem>
                      <MenuItem value="KCCI">KCCI</MenuItem>
                      <MenuItem value="ABAD">ABAD</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Position</InputLabel>
                    <Select
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      variant="outlined"
                    >
                      {positions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ bgcolor: '#12305c', '&:hover': { bgcolor: '#12305c' } }}
                    onClick={submitUser}
                  >
                    Next Page
                  </Button>
                </Stack>
              </Stack>
            )}

            {step === 2 && (
              <Stack spacing={2}>
                <Typography variant="h4" fontWeight={600} color="#12305c">
                  Candidate Registration
                </Typography>
                <Stack spacing={2}>
                  <Typography variant="h6" fontWeight={600} color="#12305c">
                    Upload Picture
                  </Typography>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ bgcolor: '#12305c', '&:hover': { bgcolor: '#12305c' } }}
                  >
                    Upload Picture
                    <input type="file" hidden onChange={(e) => handleFileUpload(e, 'pic')} />
                  </Button>
                  <Typography variant="subtitle1" fontWeight={600} color="#12305c">
                    {picFileName}
                  </Typography>
                  <Typography variant="h6" fontWeight={600} color="#12305c">
                    Upload CNIC Front
                  </Typography>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ bgcolor: '#12305c', '&:hover': { bgcolor: '#12305c' } }}
                  >
                    Upload CNIC Front
                    <input type="file" hidden onChange={(e) => handleFileUpload(e, 'cnicFront')} />
                  </Button>
                  <Typography variant="subtitle1" fontWeight={600} color="#12305c">
                    {cnicFrontFileName}
                  </Typography>
                  <Typography variant="h6" fontWeight={600} color="#12305c">
                    Upload CNIC Back
                  </Typography>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ bgcolor: '#12305c', '&:hover': { bgcolor: '#12305c' } }}
                  >
                    Upload CNIC Back
                    <input type="file" hidden onChange={(e) => handleFileUpload(e, 'cnicBack')} />
                  </Button>
                  <Typography variant="subtitle1" fontWeight={600} color="#12305c">
                    {cnicBackFileName}
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ bgcolor: '#12305c', '&:hover': { bgcolor: '#12305c' } }}
                    onClick={formSubmission}
                  >
                    Submit
                  </Button>
                </Stack>
              </Stack>
            )}
          </Stack>
        )}
      </Stack>
      <Box
        width="60%"
        sx={{
          height: '100%',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 0.5s ease-in-out',
        }}
      />
    </Box>
  );
};

export default CandidateRegistration;
