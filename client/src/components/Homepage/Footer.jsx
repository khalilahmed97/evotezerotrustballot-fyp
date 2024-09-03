import React from 'react';
import { Container, Grid, Typography, IconButton, Box } from '@mui/material';
import { Twitter, Facebook, Instagram, GitHub } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#121212', color: '#ffffff', padding: '20px 0' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
              <Box component="span" sx={{ color: '#1976d2', marginRight: '8px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="#1976d2"/>
                  <path d="M12 6L9 17H15L12 6Z" fill="white"/>
                </svg>
              </Box>
              EvoteZeroTrustBallot
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <Typography variant="body1" component="a" href="/ser" sx={{ color: '#ffffff', textDecoration: 'none' }}>
                  Product
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" component="a" href="#" sx={{ color: '#ffffff', textDecoration: 'none' }}>
                  Features
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" component="a" href="#" sx={{ color: '#ffffff', textDecoration: 'none' }}>
                  Pricing
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" component="a" href="#" sx={{ color: '#ffffff', textDecoration: 'none' }}>
                  Resources
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <IconButton href="#" sx={{ color: '#ffffff' }}>
              <Twitter />
            </IconButton>
            <IconButton href="#" sx={{ color: '#ffffff' }}>
              <Facebook />
            </IconButton>
            <IconButton href="#" sx={{ color: '#ffffff' }}>
              <Instagram />
            </IconButton>
            <IconButton href="#" sx={{ color: '#ffffff' }}>
              <GitHub />
            </IconButton>
          </Grid>
        </Grid>
        <Typography variant="body2" sx={{ textAlign: 'center', marginTop: '20px' }}>
          © Copyright 2022, All Rights Reserved by EvoteZeroTrustBallot
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
