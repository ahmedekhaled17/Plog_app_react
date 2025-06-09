import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const PostForm = ({ onSubmit, initialData = {} }) => {
  const [post, setPost] = useState({
    title: initialData.title || '',
    content: initialData.content || '',
  });

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(post);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      noValidate
      autoComplete="off"
    >
      <TextField
        label="Title"
        name="title"
        value={post.title}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Content"
        name="content"
        value={post.content}
        onChange={handleChange}
        required
        multiline
        rows={6}
        fullWidth
      />
      <Button type="submit" variant="contained" color="success">
        Submit
      </Button>
    </Box>
  );
};

export default PostForm;
