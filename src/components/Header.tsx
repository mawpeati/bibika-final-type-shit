import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <Typography variant="h6" className="header-title">
          Bibika
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/"
          className="header-button"
        >
          Posts
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/create"
          className="header-button create-button"
        >
          Create posts
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/categories"
          className="header-button create-category-button"
        >
          Create category
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;