// src/pages/Login.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { useAuth } from '../AuthProvider'; // Import the custom useAuth hook for user authentication
import { useNavigate } from 'react-router-dom'; // Import for navigation

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth(); // Extract the login function from the useAuth hook
  const navigate = useNavigate(); // Initialize useNavigate for navigation after login

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(''); // Clear any previous errors

    try {
      await login(email, password); // Attempt to log in with the provided email and password
      navigate('/'); // Redirect to the homepage or dashboard after successful login
    } catch (err) {
      setError('Failed to log in. Please check your email and password.'); // Set error if login fails
    }
  };

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>} {/* Display error if present */}
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
        <Button
          variant="text"
          color="primary"
          onClick={() => navigate('/signup')}
          sx={{ mt: 2 }}
        >
          Don't have an account? Sign Up
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
