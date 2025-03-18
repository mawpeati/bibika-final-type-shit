import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { getCategories, Category } from '../services/api';

const Header: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Lalalo
        </Typography>
        <Button color="inherit" component={Link} to="/">Все объявления</Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            color="inherit"
            component={Link}
            to={`/category/${category.id}`}
          >
            {category.name}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default Header;