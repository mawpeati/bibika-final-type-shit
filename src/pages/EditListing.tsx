import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getListings, updateListing, getCategories, Category, Listing } from '../services/api';

const EditListing: React.FC = () => {
  const { listingId } = useParams<{ listingId: string }>();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<Listing | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allListings = await getListings();
        const listing = allListings.find((l) => l.id === listingId);
        setForm(listing || null);
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [listingId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setForm((prev) => prev ? { ...prev, [name as string]: value } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form || !listingId) return;
    try {
      await updateListing(listingId, {
        title: form.title,
        description: form.description,
        price: form.price,
        categoryId: form.categoryId,
        imageUrl: form.imageUrl,
      });
      navigate(`/listing/${listingId}`);
    } catch (error) {
      console.error('Error updating listing:', error);
    }
  };

  if (!form) return <Typography>Объявление не найдено</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Редактировать объявление
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Название"
          name="title"
          value={form.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
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
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Категория</InputLabel>
          <Select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Ссылка на картинку"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Сохранить
        </Button>
      </form>
    </Container>
  );
};

export default EditListing;