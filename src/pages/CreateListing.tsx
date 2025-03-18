import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createListing } from '../services/api';
import './CreateListing.css';

const CreateListing: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: 0,
    categoryName: '',
    imageUrl: 'https://mysleepyhead.com/media/catalog/product/4/t/4thaug_2ndhalf5934_green.jpg',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.categoryName) {
      alert('Пожалуйста, укажите категорию');
      return;
    }
    try {
      await createListing(form);
      navigate('/');
    } catch (error) {
      console.error('Error creating listing:', error);
      alert('Ошибка при создании объявления.');
    }
  };

  return (
    <Container maxWidth="sm" className="create-container">
      <Paper className="create-paper">
        <Typography variant="h4" gutterBottom className="create-title">
          Создать объявление
        </Typography>
        <form onSubmit={handleSubmit} className="create-form">
          <TextField
            label="Название"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            variant="outlined"
          />
          <TextField
            label="Описание"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            required
            variant="outlined"
          />
          <TextField
            label="Цена"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            variant="outlined"
          />
          <TextField
            label="Категория"
            name="categoryName"
            value={form.categoryName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            variant="outlined"
          />
          <TextField
            label="Ссылка на картинку"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button type="submit" variant="contained" color="primary" className="create-button">
            Создать
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateListing;