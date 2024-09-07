import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_APP, FIREBASE_AUTH } from './data/FirebaseConfig';
import { TextField, Button, Container, Typography, Box, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { setDoc, doc } from 'firebase/firestore';
import { FIRESTORE_DB } from './data/FirebaseConfig';
import './SignUp.css'; // Import the CSS file

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Volunteer');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = userCredential.user;

      await setDoc(doc(FIRESTORE_DB, 'users', user.uid), {
        email: user.email,
        role: role,
      });

      setSuccess('Account created successfully! Redirecting to login...');
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
            <FormControl fullWidth margin="normal" className="sign-up-field">
              <InputLabel>Role</InputLabel>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <MenuItem value="Volunteer">Volunteer</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Executive">Executive</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" fullWidth className="sign-up-button">
              Sign Up
            </Button>
          </form>
          <Button
            variant="text"
            color="primary"
            onClick={() => console.log("working")}
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
