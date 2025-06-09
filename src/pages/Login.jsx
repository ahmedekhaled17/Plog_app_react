import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../authContext';

import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Container,
  Paper,
  Link,
} from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    try {
      const res = await axios.post('http://localhost:3000/login', { email, password });
      login(res.data);
      navigate('/home');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box
          component="form"
          onSubmit={handleLogin}
          noValidate
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />
          <Button variant="contained" type="submit" size="large">
            Login
          </Button>
        </Box>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Link component={RouterLink} to="/register" underline="hover">
            Register 
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
