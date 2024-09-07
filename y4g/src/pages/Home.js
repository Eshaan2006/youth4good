// src/pages/Home.js

import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { keyframes } from '@emotion/react';

// Keyframe animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const bounceIn = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
`;

function Home() {
  return (
    <Box
      sx={{
        backgroundColor: '#e0f7fa', // Light blue background
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 3,
        animation: `${fadeIn} 1.5s ease-in`,
        fontFamily: 'Roboto, sans-serif', // Default font
      }}
    >
      <Container
        sx={{
          backgroundColor: '#ffffff', // White background for content area
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          animation: `${bounceIn} 1s ease-in-out`,
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            color: '#00796b',
            animation: `${fadeIn} 2s ease-in`,
            fontFamily: 'Montserrat, sans-serif', // Heading font
          }}
        >
          Welcome to Youth4Good
        </Typography>
        <Typography
          variant="h5"
          paragraph
          sx={{
            color: '#616161',
            animation: `${fadeIn} 2.5s ease-in`,
            fontFamily: 'Roboto, sans-serif', // Body font
          }}
        >
          This is the home page where you can learn more about our organization and our mission.
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                backgroundColor: '#4fc3f7',
                ':hover': { backgroundColor: '#29b6f6' },
                animation: `${bounceIn} 1s ease-in-out`,
                fontFamily: 'Roboto, sans-serif',
              }}
            >
              Learn More
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              sx={{
                borderColor: '#4fc3f7',
                color: '#4fc3f7',
                ':hover': { borderColor: '#29b6f6', color: '#29b6f6' },
                animation: `${bounceIn} 1.2s ease-in-out`,
                fontFamily: 'Roboto, sans-serif',
              }}
            >
              Join Us
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;
