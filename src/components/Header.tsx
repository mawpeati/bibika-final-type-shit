import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <Typography variant="h6" className="header-title">
          Lalalo
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/"
          className="header-button"
        >
          Все объявления
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/create"
          className="header-button create-button"
        >
          Создать объявление
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;