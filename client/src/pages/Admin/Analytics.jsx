import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Timer from "../../components/MainDash/Timer";
import { Box, Typography, Tab, Tabs, Card, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { BarChart, Bar, LineChart, Line, ResponsiveContainer, Tooltip, PieChart, Pie, Cell, LabelList, Label, Legend, XAxis, CartesianGrid } from 'recharts';
import { getAllCandidates, getAllAcceptedCandidates } from "../../features/candidate/candidateSlice";
import { getAllVoters } from "../../features/voter/voterSlice";
import { useDispatch, useSelector } from 'react-redux';

const ChartContainer = styled(Box)({
  width: '100%',
  padding: '20px',
});

const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: "bold",
  fontFamily: "Poppins",
}));

const CustomizedAxisTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill="#666" transform="rotate(0)" fontFamily="Poppins" fontSize="12px">
        {payload.value}
      </text>
    </g>
  );
};

const Analytics = () => {
  const dispatch = useDispatch();
  const { acceptedCandidates, candidates } = useSelector(state => state.candidate);
  const { voters } = useSelector(state => state.voter);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    dispatch(getAllCandidates());
    dispatch(getAllVoters());
    dispatch(getAllAcceptedCandidates());
  }, [dispatch]);

  const acceptedCandidate = candidates.filter(candidate => candidate.status === 'Approve');
  const declinedCandidates = candidates.filter(candidate => candidate.status === 'Disapprove');

  const calculateGenderCounts = (data) => {
    const menCount = data.filter(item => item.gender === 'male').length;
    const womenCount = data.filter(item => item.gender === 'female').length;
    return { men: menCount, women: womenCount };
  };

  const calculateVoterGenderCounts = (data) => {
    const menCount = data.filter(item => item.gender === 'Male').length;
    const womenCount = data.filter(item => item.gender === 'Female').length;
    return { men: menCount, women: womenCount };
  };

  const calculateMaleCount = (data) => {
    const position = acceptedCandidates.filter(item => item.position_applied === data);
    return position.filter(item => item.gender === 'male').length;
  };

  const calculateFemaleCount = (data) => {
    const position = acceptedCandidates.filter(item => item.position_applied === data);
    return position.filter(item => item.gender === 'female').length;
  };

  const candidateBarChartData = [
    { name: 'President', men: calculateMaleCount("President"), women: calculateFemaleCount("President") },
    { name: 'Sr. Vice President', men: calculateMaleCount("Sr. Vice President"), women: calculateFemaleCount("Sr. Vice President") },
    { name: 'Vice President', men: calculateMaleCount("Vice President"), women: calculateFemaleCount("Vice President") },
    { name: 'General Secretary', men: calculateMaleCount("General Secretary"), women: calculateFemaleCount("General Secretary") },
  ];

  const voterBarChartData = [
    { name: 'Voters', ...calculateVoterGenderCounts(voters) },
  ];

  const COLORS = ['#135498', '#d3d3d3'];
  const GENDER_COLORS = ['#8884d8', '#82ca9d'];

  const gaugeChartData = [
    { name: 'Accepted', value: acceptedCandidate.length },
    { name: 'Declined', value: declinedCandidates.length },
  ];

  const lineChartData = [
    { name: 'Hour 1', voters: Math.floor(voters.length * 0.2) },
    { name: 'Hour 2', voters: Math.floor(voters.length * 0.4) },
    { name: 'Hour 3', voters: Math.floor(voters.length * 0.6) },
    { name: 'Hour 4', voters: Math.floor(voters.length * 0.8) },
    { name: 'Hour 5', voters: voters.length },
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box height="100vh" width="80%">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Timer />
        <Navbar />
      </Box>

      <Box fontFamily="Poppins" color="#074693" fontSize="30px" fontWeight="bold" textAlign="left" marginBottom="20px">
        Analytics
      </Box>

      <Typography fontFamily="Poppins" textAlign="left" fontSize="20px" fontWeight="500" marginBottom="10px">
        Home / Analytics
      </Typography>

      <Box sx={{
        background: 'white',
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        marginTop: "2rem",
      }}>
        <Card sx={{
          background: 'linear-gradient(135deg, #F9F5FF 0%, #AEC6CF 100%)',
          border: '2px solid #135498',
          borderRadius: '20px',
        }}>
          <StyledTabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Candidate" />
            <Tab label="Voter" />
          </StyledTabs>
        </Card>
        <ChartContainer>
          {tabValue === 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" padding="20px" fontFamily="Poppins" textAlign="center" fontSize="20px" fontWeight="500" marginBottom="20px">
                  Candidate Gender Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={candidateBarChartData}>
                    <CartesianGrid strokeDasharray="1 1" />
                    <XAxis dataKey="name" tick={<CustomizedAxisTick />} />
                    <Tooltip />
                    <Bar dataKey="men" fill={GENDER_COLORS[0]}>
                      <LabelList dataKey="men" position="top" />
                    </Bar>
                    <Bar dataKey="women" fill={GENDER_COLORS[1]}>
                      <LabelList dataKey="women" position="top" />
                    </Bar>
                    <Legend />
                  </BarChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" padding="20px" fontFamily="Poppins" textAlign="center" fontSize="20px" fontWeight="500" marginBottom="20px">
                  Candidate Status Overview
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={gaugeChartData}
                      cx="50%"
                      cy="50%"
                      startAngle={180}
                      endAngle={0}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label
                    >
                      {gaugeChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                      <Label value="" position="insideBottom" fill={COLORS[0]} />
                      <Label value="" position="insideTop" fill={COLORS[1]} />
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Grid>
            </Grid>
          )}
          {tabValue === 1 && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" padding="20px" fontFamily="Poppins" textAlign="center" fontSize="20px" fontWeight="500" marginBottom="20px">
                  Voter Trends Over Time
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={lineChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={<CustomizedAxisTick />} />
                    <Tooltip />
                    <Line type="monotone" dataKey="voters" stroke="#8884d8">
                      <LabelList dataKey="voters" position="top" />
                    </Line>
                    <Legend />
                  </LineChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" padding="20px" fontFamily="Poppins" textAlign="center" fontSize="20px" fontWeight="500" marginBottom="20px">
                  Voter Gender Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={voterBarChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <Bar dataKey="men" fill={GENDER_COLORS[0]}>
                      <LabelList dataKey="men" position="top" />
                    </Bar>
                    <Bar dataKey="women" fill={GENDER_COLORS[1]}>
                      <LabelList dataKey="women" position="top" />
                    </Bar>
                    <Legend />
                  </BarChart>
                </ResponsiveContainer>
              </Grid>
            </Grid>
          )}
        </ChartContainer>
      </Box>
    </Box>
  );
};

export default Analytics;
