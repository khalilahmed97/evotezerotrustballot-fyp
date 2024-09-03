import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { Button, Modal, Stack, Typography } from '@mui/material';

const CandidateCamModal = ({ open, onClose, onCapture }) => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  const retake = () => {
    setCapturedImage(null);
  };

  const handleClose = () => {
    setCapturedImage(null);
    onClose();
  };

  const handleCaptureClick = () => {
    capture();
  };

  const handleRetakeClick = () => {
    retake();
  };

  const handleSaveClick = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Stack
        sx={{
          position: 'absolute',
          top: '80%',
          left: '80%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          width: 400,
          borderRadius: 4,
          textAlign: 'center',
        }}
      >
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{ width: '100%', borderRadius: 4 }}
        />
        <Stack direction="row" spacing={2} justifyContent="center" marginTop={2}>
          {!capturedImage ? (
            <Button variant="contained" onClick={handleCaptureClick}>
              Capture
            </Button>
          ) : (
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={handleRetakeClick}>
                Retake
              </Button>
              <Button variant="contained" onClick={handleSaveClick}>
                Save
              </Button>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Modal>
  );
};

export default CandidateCamModal;
