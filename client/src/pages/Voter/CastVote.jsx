import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Timer from '../../components/MainDash/Timer';
import Navbar from '../../components/Navbar/Navbar';
import Modal from '@material-ui/core/Modal';
import { Box } from '@mui/material';
import { Snackbar, Alert } from "@mui/material";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAcceptedCandidates } from '../../features/candidate/candidateSlice';
import { castVote, checkVoted } from '../../features/voter/voterSlice';

const useStyles = makeStyles((theme) => ({
  mainBackground: {
    borderRadius: "2rem",
    overflow: "hidden",
    margin: "20px auto",
    height: "91%",
    padding: "0px",
    backgroundColor: "#dbd7d7",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  },
  headingCard1: {
    margin: "1rem",
    marginBottom: "0rem",
    width: "97%",
    color: "#135498",
    padding: "1rem",
    borderRadius: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  positionCard: {
    width: '97%',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #F9F5FF 0%, #AEC6CF 100%)',
    color: '#135498',
    fontFamily: 'Poppins',
    border: '2px solid #135498',
    borderRadius: '20px',
    flexDirection: 'row',
    margin: "1rem",
    marginTop: "1rem",
    marginBottom: "1rem",
    marginLeft: "auto",
    marginRight: "auto",
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    margin: '20px 0',
    color: "#fff",
    width: "100%",
  },
  candidateCard: {
    width: '250px', // Fixed width for the card
    height: '300px', // Fixed height for the card
    textAlign: 'center',
    background: '#135498',
    color: '#F9F5FF',
    fontFamily: 'Poppins',
    border: '2px solid #135498',
    borderRadius: '20px',
    margin: "2rem",
    marginTop: "-1rem",
    gap: "1rem",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  candidateDetails: {
    width: '60%',
    textAlign: 'center',
    background: '#135498',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    border: '2px solid #135498',
    borderRadius: '20px',
    flexDirection: 'row',
    margin: "0rem",
    marginTop: "1rem",
    marginBottom: "1rem",
    marginLeft: "auto",
    marginRight: "auto",
  },
  candidateImage: {
    width: "100px",
    height: "100px",
    borderRadius: "20%",
    marginBottom: "10px",
  },
  dropdownButton: {
    color: "white",
    width: "200px",
    border: "none",
    cursor: "pointer",
    padding: "16px",
    margin: "1rem",
    fontSize: "16px",
    textAlign: "center",
    borderRadius: "10px",
    textDecoration: "none",
    backgroundColor: "#135498",
  },
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: "#ffffff",
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  button: {
    backgroundColor: '#299617',
    color: '#FFFFFF',
    paddingInline: "15px",
    marginRight: theme.spacing(2),
  },
  indicator: {
    backgroundColor: '#135498',
    height: '3px',
  },
}));

const CastVote = () => {
  const dispatch = useDispatch();
  const { acceptedCandidates } = useSelector(state => state.candidate);
  const { user } = useSelector((state) => state.user);
  const { votesStatus } = useSelector((state) => state.voter);
  const [isSuccess, setIsSuccess] = useState(false);
  const [timer, setTimer] = useState(20);
  const classes = useStyles();
  const [selectedPosition, setSelectedPosition] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1)
      } else {
        clearInterval(interval);
        setOpenModal(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    dispatch(getAllAcceptedCandidates());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkVoted(user.user.cnic))
  }, [dispatch]);

  const handlePositionSelect = (event, newPosition) => {
    setSelectedPosition(newPosition);
    setSelectedCandidate(null);
  };

  const handleVoteButtonClick = (candidate) => {
    setSelectedCandidate(candidate);
    setOpenModal(true);
  };

  const handleYesButtonClick = () => {
    setOpenModal(false);
    setIsSuccess(true);

    dispatch(castVote({
      voterCnic: user.user.cnic, // Voter's CNIC
      candidateCnic: selectedCandidate.cnic, // Candidate's CNIC
      position: selectedPosition // Selected position
    }));
  };

  const handleNoButtonClick = () => {
    setOpenModal(false);
  };

  const isVoteDisabledForPosition = () => {
    switch (selectedPosition) {
      case 'President':
        console.log(votesStatus.is_president_voted)
        return votesStatus.is_president_voted === true;
      case 'Sr. Vice President':
        return votesStatus.is_sr_vp_voted ===true;
      case 'Vice President':
        return votesStatus.is_vp_voted === true;
      case 'General Secretary':
        return votesStatus.is_gen_sec_voted === true;
      default:
        return false;
    }
  };

  const filteredCandidates = acceptedCandidates.filter(candidate => candidate.position_applied === selectedPosition);

  return (
    <Box height={"100vh"} width={"80%"}>
      <Snackbar
        open={isSuccess}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="success"
          sx={{ width: "100%", fontSize: "16px" }}
        >
          Your vote has been successfully cast
        </Alert>
      </Snackbar>
      <Box display={"flex"} justifyContent="space-evenly" alignItems={"center"}>
        <Timer />
        <Navbar />
      </Box>
      <Card className={classes.headingCard1}>
        <Typography variant="h4" component="div">
          Cast Your Vote
        </Typography>
      </Card>
      <div className={classes.cardContainer}>
        <Card className={classes.positionCard}>
          <CardContent>
            <Tabs
              value={selectedPosition}
              textColor="primary"
              onChange={handlePositionSelect}
              orientation="horizontal"
              centered
              classes={{ indicator: classes.indicator }}
            >
              <Tab label="President" value="President" />
              <Tab label="Sr Vice President" value="Sr. Vice President" />
              <Tab label="Vice President" value="Vice President" />
              <Tab label="General Secretary" value="General Secretary" />
            </Tabs>
          </CardContent>
        </Card>
      </div>
      {selectedPosition && (
        <div className={classes.cardContainer}>
          <CardContent>
            <div className={classes.cardContainer}>
              {filteredCandidates.map((candidate) => (
                <Card key={candidate.id} className={classes.candidateCard}>
                  <CardContent>
                    <img src={candidate.imageData} alt={candidate.name} className={classes.candidateImage} />
                    <Typography variant="h6" component="div">
                      ID: {candidate.membership_number}
                    </Typography>
                    <Typography variant="h6" component="div">
                      Name: {candidate.name}
                    </Typography>
                    <div className={classes.buttonContainer}>
                      <Button
                        variant="contained"
                        className={classes.button}
                        onClick={() => handleVoteButtonClick(candidate)}
                        disabled={isVoteDisabledForPosition()} // Disable all vote buttons for the tab
                      >
                        Vote
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </div>
      )}
      <Modal
        open={openModal}
        onClose={handleNoButtonClick}
      >
        <div className={classes.modal}>
          <h2>Confirmation</h2>
          <p>Are you sure you want to vote for {selectedCandidate?.name} as {selectedPosition}?</p>
          <Button variant="contained" className={classes.button} onClick={handleYesButtonClick}>Yes</Button>
          <Button variant="contained" onClick={handleNoButtonClick}>No</Button>
        </div>
      </Modal>
    </Box>
  );
};

export default CastVote;
