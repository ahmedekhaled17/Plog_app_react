import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import { useAuth } from '../authContext';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Typography,
  Button,
  Paper,
} from '@mui/material';

const Home = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:3000/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(res.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Box
      p={4}
      maxWidth="900px"
      mx="auto"
      position="relative"
      minHeight="100vh"
    >
      <Typography variant="h4" fontWeight="bold" mb={4} >
        Your Posts
      </Typography>

      {posts.length > 0 ? (
        posts.map((post) => (
          <Paper
            key={post.id}
            elevation={3}
            sx={{ p: 2, mb: 3, width: '100%' }}
          >
            <PostCard post={post} fetchPosts={fetchPosts} />
          </Paper>
        ))
      ) : (
        <Typography variant="body1" color="text.secondary" textAlign="center">
          No posts found.
        </Typography>
      )}

      <Button
        onClick={() => navigate('/add')}
        variant="contained"
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: '50%',
          boxShadow: 3,
          minWidth: 'unset',
          padding: 0,
          '&:hover': {
            boxShadow: 6,
          },
        }}
      >
        <AddIcon />
      </Button>
    </Box>
  );
};

export default Home;
