import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../authContext';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/home"
          sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
        >
          MyBlog
        </Typography>

        {user ? (
          <>
            <Button
              color="inherit"
              component={RouterLink}
              to="/home"
              sx={{ mr: 2 }}
            >
              Home
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              color="inherit"
              component={RouterLink}
              to="/login"
              sx={{ mr: 2 }}
            >
              Login
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/register"
            >
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
