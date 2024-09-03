import { Box, Typography, Stack, Avatar, Paper, Grid } from '@mui/material';
import React from 'react';

const VoterProfileDetail = () => {
  // Sample data
  const voter = {
    name: 'John Doe',
    cnic: '12345-6789012-3',
    membershipNumber: '2020001',
    gender: 'Male',
    email: 'john.doe@example.com',
    organization: 'KATI',
    picture: 'https://via.placeholder.com/150' // Placeholder image URL
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ bgcolor: '#f5f5f5' }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 800, width: '100%' }}>
        {console.log(voter)}
        <Grid container spacing={3}>
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <Avatar
              alt={voter.name}
              src={voter.picture}
              sx={{ width: 150, height: 150 }}
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Typography variant="h5" fontWeight="bold" textAlign="center">
              {voter.name}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Name:
            </Typography>
            <Typography variant="body1">{voter.name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              CNIC #:
            </Typography>
            <Typography variant="body1">{voter.cnic}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Membership #:
            </Typography>
            <Typography variant="body1">{voter.membershipNumber}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Gender:
            </Typography>
            <Typography variant="body1">{voter.gender}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Email:
            </Typography>
            <Typography variant="body1">{voter.email}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Organization:
            </Typography>
            <Typography variant="body1">{voter.organization}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default VoterProfileDetail;
