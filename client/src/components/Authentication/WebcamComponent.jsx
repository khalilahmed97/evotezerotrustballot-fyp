import React, { useRef, useCallback, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert, Button, Box, Container, Typography, CircularProgress } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import InfoIcon from '@mui/icons-material/Info';
import * as faceapi from 'face-api.js';
import { registerUser, loginUser } from '../../features/auth/authSlice.js';
import { registerCandidate } from '../../features/candidate/candidateSlice.js';

const WebcamComponent = ({ cnic, setOpen, currentPage, userData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null); // Ref for the canvas to draw the face box
  const [loading, setLoading] = useState(false);
  const { message, isSuccess, error } = useSelector(state => state.user);
  const [verificationStatus, setVerificationStatus] = useState(null); // null, 'success', 'fail'
  const [errors, setErrors] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [image, setImage] = useState(null); // State to store the captured image
  const [captureTimeout, setCaptureTimeout] = useState(null);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + '/models';
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    };
    loadModels();
  }, []);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleCapture = useCallback(async () => {
    if (!webcamRef.current || image) return; // Stop capturing if an image has already been captured

    setLoading(true);

    if (message === "Incorrect Password!" || message === "User with provided CNIC does not exist!") {
      setSnackbarOpen(false);
      stopWebcam();
      window.location.reload(2);
    }
    setSnackbarOpen(true);
    setSnackbarMessage('Please wait a while...'); // Show the "Please wait a while..." message
    
    const imageSrc = webcamRef.current.getScreenshot();
    const imageName = `${cnic}.jpeg`; // Construct image name using CNIC

    try {
      // Convert the image to Blob
      const response = await fetch(imageSrc);
      const blob = await response.blob();

      // Save the image data in state
      setImage(imageSrc);
      setLoading(false);
      setVerificationStatus('success');
      stopWebcam(); // Stop the webcam when done
    } catch (err) {
      console.error(err); // Log the error for debugging
      setLoading(false);
      setErrors('Failed to capture image');
      setVerificationStatus('fail');
    }
  }, [cnic, image, setOpen]);

  const startCapture = () => {
    if (captureTimeout) clearTimeout(captureTimeout);
    const timeout = setTimeout(handleCapture, 3000);
    setCaptureTimeout(timeout);
  };

  const stopWebcam = () => {
    if (webcamRef.current && webcamRef.current.stream) {
      webcamRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (webcamRef.current && !image) { // Stop interval if an image has already been captured
        console.log("Trying face detection...");
        const video = webcamRef.current.video;
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());

        // Draw the detection box
        if (canvasRef.current) {
          const displaySize = { width: video.videoWidth, height: video.videoHeight };
          faceapi.matchDimensions(canvasRef.current, displaySize);
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        }

        console.log("Number of faces detected:", detections.length);
        if (detections.length > 0) {
          console.log("Face detected, capturing...");
          startCapture(); // Start capture with debouncing
        } else {
          console.log("No face detected.");
          setSnackbarOpen(true);
          setSnackbarMessage('No face detected. Please position your face clearly.');
        }
      }
    }, 3000); // Adjust interval as needed

    return () => clearInterval(intervalId);
  }, [handleCapture, image]);

  // Function to send captured image to the backend
  useEffect(() => {
    if (verificationStatus === 'success') {
      const userDataWithImage = {
        ...userData,
        image: image
      };
      if (currentPage === "signin") {
        setSnackbarOpen(true);
        setSnackbarMessage('Please wait a while, system is verifying your details');
        setTimeout(() => {
          dispatch(loginUser(userDataWithImage));
        }, 2000); // Delay to show the verification message
      } else if (currentPage === "signup") {
        dispatch(registerUser(userDataWithImage));
     
        navigate("/login")
      } else if (currentPage === "candidate-registration") {
        dispatch(registerCandidate(userDataWithImage));
       
      }
    }
  }, [verificationStatus]);

  useEffect(() => {
    if (isSuccess) {
      if (currentPage === "signin" && message === "Login Successfull!") {
        setSnackbarOpen(true);
        setSnackbarMessage('Login Successfully');
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000); // Delay to show the success message before navigating
      } else if (currentPage === "signin" && (message === "Incorrect Password!" || message === "User with provided CNIC does not exist!" || message === "Face Authentication Failed")) {
        setSnackbarOpen(true);
        setSnackbarMessage(message);
        setTimeout(() => {
          setOpen(false); // Close the modal
          navigate("/login");
          window.location.reload(2);
        }, 1000); // Delay to show the error message before navigating
      } else if (currentPage === "signup") {
        setSnackbarMessage('Registration successful. Redirecting...')
        setTimeout(() => {
          console.log(isSuccess)
          window.location.reload(2);
          navigate("/login");
        }, 2000);
      }

      else if (currentPage === "candidate-registration"){
        setSnackbarMessage('Registration successful. Redirecting...')
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } else if (error) {
      setErrors(error);
      setSnackbarOpen(true);
      setSnackbarMessage(error);
    }
  }, [isSuccess]);

  return (
    <Container>
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={isSuccess ? "success" : "info"}
          icon={isSuccess ? <InfoIcon fontSize="inherit" /> : <CircularProgress size={24} />}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      
      <Box display="flex" justifyContent="center">
        <Typography variant="h4" component="h1" gutterBottom fontFamily={"sans-serif"} fontWeight={"bold"}>
          FACE VERIFICATION
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" position="relative">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={480}  // reduced width
          height={360} // reduced height
          style={{
            marginBottom: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '480px',
            height: '360px',
          }}
        />
        {verificationStatus === 'success' && (
          <Button
            variant="contained"
            color="success"
            startIcon={<PhotoCameraIcon />}
            onClick={() => setOpen(false)}
          >
            Successfully Captured
          </Button>
        )}
        {errors && <Typography color="error">{errors}</Typography>}
      </Box>
    </Container>
  );
};

export default WebcamComponent;
