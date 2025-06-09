import React from 'react';
import axios from 'axios';
import { useAuth } from '../authContext';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const PostCard = ({ post, fetchPosts }) => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/posts/${post.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchPosts();
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  return (
    <Card sx={{ maxWidth: 700, margin: 'auto', mt: 2 }}>
      {post.imageUrl && (
        <CardMedia
          component="img"
          height="300"
          image={post.imageUrl}
          alt={post.title}
          sx={{ objectFit: 'cover' }}
        />
      )}

      <CardContent>
        <Typography variant="h5" component="div" gutterBottom fontWeight="bold">
          {post.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {post.content}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            color="warning"
            onClick={() => navigate(`/edit/${post.id}`)}
            aria-label="edit"
            sx={{
              minWidth: 45,
              minHeight: 45,
              padding: 0,
              borderRadius: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <EditIcon />
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            aria-label="delete"
            sx={{
              minWidth: 45,
              minHeight: 45,
              padding: 0,
              borderRadius: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <DeleteIcon />
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default PostCard;
