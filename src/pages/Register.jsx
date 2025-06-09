import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  Container,
  Link,
} from '@mui/material';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      await axios.post('http://localhost:3000/register', { email, password });
      navigate('/login');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Register
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleRegister} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 1 }}
          >
            Register
          </Button>
        </Box>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link component={RouterLink} to="/login" underline="hover">
            Login 
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
