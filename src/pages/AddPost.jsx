import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../authContext';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Snackbar, 
} from '@mui/material';

const AddPost = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !content.trim() || !imageUrl.trim()) {
      setError('Please fill in all fields including Image URL.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:3000/posts',
        { title, content, imageUrl, userId: user.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(true);
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (err) {
      setError('Failed to add post. Try again.');
    }
  };

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
      <Typography variant="h5" component="h2" mb={3} fontWeight="bold">
        Add New Post
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
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          fullWidth
          required
        />
        <TextField
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter post content"
          fullWidth
          multiline
          rows={5}
          required
        />
        <TextField
          label="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Enter image URL"
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary" size="large">
          Add Post
        </Button>
      </Box>
      <Snackbar
        open={success}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          ✅ Post published successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddPost;
