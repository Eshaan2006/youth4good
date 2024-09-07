// src/pages/SignUp.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_APP, FIREBASE_AUTH } from './data/FirebaseConfig';
import { TextField, Button, Container, Typography, Box, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { setDoc, doc } from 'firebase/firestore';
import { FIRESTORE_DB } from './FirebaseConfig';

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
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = userCredential.user;

      // Store user role in Firestore
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
    <div className="services">
      <Container maxWidth="xs">
        <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
          <Typography variant="h4" gutterBottom>
            Sign Up for Y4G
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          <form onSubmit={handleSignUp}>
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
            <FormControl fullWidth margin="normal">
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
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign Up
            </Button>
          </form>
          <Button
            variant="text"
            color="primary"
            onClick={() => console.log("working")}
            sx={{ mt: 2 }}
          >
            Already have an account? Login
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default SignUp;
