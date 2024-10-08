import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../data/FirebaseConfig';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { setDoc, doc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../data/FirebaseConfig';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');  // State for first name
  const [lastName, setLastName] = useState('');    // State for last name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate for navigation after login

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = userCredential.user;

      // Store user data including first and last name in Firestore with default role "Volunteer"
      await setDoc(doc(FIRESTORE_DB, 'users', user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: user.email,
        role: 'Volunteer', // Automatically assign "Volunteer" role
      });

      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 seconds
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="sign-up">
      <Container className="sign-up-container">
        <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
          <Typography variant="h4" gutterBottom className="sign-up-header">
            Sign Up for Y4G
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          <form onSubmit={handleSignUp} className="sign-up-form">
            <TextField
              label="First Name"
              type="text"
              fullWidth
              margin="normal"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="sign-up-field"
            />
            <TextField
              label="Last Name"
              type="text"
              fullWidth
              margin="normal"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="sign-up-field"
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="sign-up-field"
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="sign-up-field"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth className="sign-up-button">
              Sign Up
            </Button>
          </form>
          <Button
            variant="text"
            color="primary"
            onClick={() => navigate('/login')}
            className="sign-up-link"
          >
            Already have an account? Login
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default SignUp;
