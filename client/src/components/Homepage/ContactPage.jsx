import React from 'react';
import { Container, Grid, Paper, Typography, TextField, Button, Box } from '@mui/material';
import { LocationOn, Phone, Email } from '@mui/icons-material';

const ContactPage = ({data}) => {
  return (
    <Container id="contact" maxWidth="100%" style={{ marginTop: '50px', marginBottom:"50px" }}>
      <Paper elevation={3}>
        <Grid container>
          <Grid item xs={12} md={6} style={{ backgroundColor: '#f5f5f5', paddingInline: '40px', display:"flex",flexDirection:"column", justifyContent:"center", gap:"15px" }}>
            <Typography variant="h4" gutterBottom sx={{paddingBottom:"20px"}}>
              Let's talk about the future
            </Typography>
            <Typography variant="body1" gutterBottom>
              We're here to answer your questions.
            </Typography>
            <Box style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
              <LocationOn style={{ marginRight: '10px' }} />
              <Typography variant="body1">
                {data.address}
              </Typography>
            </Box>
            <Box style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <Phone style={{ marginRight: '10px' }} />
              <Typography variant="body1">
                {data.phone}
              </Typography>
            </Box>
            <Box style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <Email style={{ marginRight: '10px' }} />
              <Typography variant="body1">
                {data.email}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} style={{ padding: '40px' }}>
            <Typography variant='h4' color={"#003B6D"}>Contact Us</Typography>
            <form noValidate>
            <TextField
                fullWidth
                label="Name"
                variant="outlined"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email address"
                variant="outlined"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                margin="normal"
                required
                multiline
                rows={4}
              />
              <Button variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
                SUBMIT
              </Button>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ContactPage;

