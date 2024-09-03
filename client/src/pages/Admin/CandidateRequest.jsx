import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Modal,
  Backdrop,
  Fade,
  Snackbar,
  Alert,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {
  approveCandidate,
  disapproveCandidate,
  getCandidate,
} from "../../features/candidate/candidateSlice";
import { useDispatch, useSelector } from "react-redux";
import Timer from "../../components/MainDash/Timer";
import Navbar from "../../components/Navbar/Navbar";

const CandidateRequest = () => {
  const { cnic } = useParams();
  const [cnicPic, setCnicPic] = useState("");
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { candidate, message, isSuccess } = useSelector(
    (state) => state.candidate
  );

  useEffect(() => {
    const fetchCandidate = async () => {
      await dispatch(getCandidate(cnic));
      setLoading(false); // Set loading to false after data is fetched
    };
    fetchCandidate();
  }, [cnic, dispatch]);

  const handleApprove = () => {
    dispatch(approveCandidate(cnic));
    setSnackbarOpen(true);
    setTimeout(() => {
      navigate(`/request/?status=approved`);
    }, 2000);
  };

  const handleDecline = () => {
    dispatch(disapproveCandidate(cnic));
    setSnackbarOpen(true);
    setTimeout(() => {
      navigate(`/request/?status=approved`);
    }, 2000);
  };

  const handleViewCnicFront = () => {
    setCnicPic(candidate.cnic_front);
    setOpen(true);
  };

  const handleViewCnicBack = () => {
    setCnicPic(candidate.cnic_back);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!candidate) {
    return <Typography>No candidate found.</Typography>;
  }

  return (
    <Box height={"100vh"} width={"80%"}>
      <Box display={"flex"} justifyContent="space-evenly" alignItems={"center"}>
        <Timer />
        <Navbar />
      </Box>

      <Box
        fontFamily={"Poppins"}
        color={"#074693"}
        sx={{
          fontSize: "25px",
          marginTop: "20px",
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        Candidate Request
      </Box>
      <Typography fontFamily={"Poppins"} textAlign="left">
        Home / Candidate Request
      </Typography>

      <Paper
        elevation={3}
        style={{
          padding: "1rem",
          width: "100%",
          margin: "0rem",
          backgroundColor: "#F9F5FF",
        }}
      >
   
        <Box display="flex" alignItems="center">
          <Box display="flex" flexDirection="column" alignItems="start" marginBottom="0rem">
            <Avatar
              alt="Profile Picture"
              src={`data:image/jpeg;base64,${candidate.image}`}
              sx={{ width: "100px", height: "100px", marginBottom: "1rem", margin: "1rem" }}
            />
          </Box>
          <Typography variant="h5" align="start" marginBottom="0rem">
            {candidate.name}
          </Typography>
        </Box>

        <Box component="form" margin={"1rem"}>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <TextField label="CNIC" defaultValue={candidate.cnic} variant="outlined" fullWidth disabled />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Membership #" defaultValue={candidate.membership_number} variant="outlined" fullWidth disabled />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Gender" defaultValue={candidate.gender} variant="outlined" fullWidth disabled />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Email" defaultValue={candidate.email_address} variant="outlined" fullWidth disabled />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Position" defaultValue={candidate.position_applied} variant="outlined" fullWidth disabled />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Organization" defaultValue={candidate.organization} variant="outlined" fullWidth disabled />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleViewCnicFront}
                fullWidth
                style={{ marginBottom: "1rem", width: "100%" }}
              >
                <Typography>View CNIC Front</Typography>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleViewCnicBack}
                fullWidth
                style={{ marginBottom: "1rem", width: "100%" }}
              >
                <Typography>View CNIC Back</Typography>
              </Button>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="center" marginTop="2rem">
            <Button
              variant="contained"
              color="success"
              startIcon={<CheckIcon />}
              style={{ backgroundColor: "#4CAF50", color: "white", marginRight: "1rem" }}
              onClick={handleApprove}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<CloseIcon />}
              style={{ backgroundColor: "#F44336", color: "white" }}
              onClick={handleDecline}
            >
              Decline
            </Button>
          </Box>
        </Box>
      </Paper>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              height: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              textAlign: "center",
            }}
          >
            <img
              src={`data:image/jpeg;base64,${cnicPic}`}
              alt="CNIC"
              style={{ width: "100%", maxHeight: "350px", objectFit: "contain" }}
            />
          </Box>
        </Fade>
      </Modal>

      <Snackbar
        open={isSuccess}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%", fontSize: "16px" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CandidateRequest;
