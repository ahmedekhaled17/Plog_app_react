import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../authContext';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [post, setPost] = useState({ title: '', content: '', imageUrl: '', userId: null }); // أضفت imageUrl هنا
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    setLoading(true);
    axios
      .get(`http://localhost:3000/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.userId !== user.id) {
          alert('You are not authorized to edit this post.');
          navigate('/home');
          return;
        }
        setPost(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load post.');
        setLoading(false);
      });
  }, [id, token, navigate, user]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    axios
      .put(`http://localhost:3000/posts/${id}`, post, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => navigate('/home'))
      .catch(() => setError('Failed to update post.'));
  };

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Box
      maxWidth={600}
      mx="auto"
      mt={8}
      p={4}
      bgcolor="background.paper"
      borderRadius={2}
      boxShadow={3}
    >
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Edit Post
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <TextField
          label="Post Title"
          name="title"
          value={post.title}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Post Content"
          name="content"
          value={post.content}
          onChange={handleChange}
          required
          fullWidth
          multiline
          rows={5}
        />
        <TextField
          label="Image URL"
          name="imageUrl"
          value={post.imageUrl || ''}
          onChange={handleChange}
          placeholder="Enter image URL"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" size="large">
          Update Post
        </Button>
      </Box>
    </Box>
  );
};

export default EditPost;
