import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { createCategory, getCategories, updateCategory, Category } from '../services/api';
import './CategoryManager.css';

const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [editCategory, setEditCategory] = useState<Category | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory) return;
    try {
      const createdCategory = await createCategory(newCategory);
      setCategories([...categories, createdCategory]);
      setNewCategory('');
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCategory || !editCategory.name) return;
    try {
      await updateCategory(editCategory.id, editCategory.name);
      setCategories(categories.map((cat) => (cat.id === editCategory.id ? editCategory : cat)));
      setEditCategory(null);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <Container maxWidth="sm" className="category-manager-container">
      <Typography variant="h4" gutterBottom className="category-manager-title">
        Управление категориями
      </Typography>

      <form onSubmit={handleCreate} className="category-manager-form">
        <TextField
          label="Новая категория"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary" className="category-manager-button">
          Добавить
        </Button>
      </form>

    
      <List>
        {categories.map((category) => (
          <ListItem key={category.id} className="category-manager-item">
            {editCategory?.id === category.id ? (
              <form onSubmit={handleEdit} className="category-manager-edit-form">
                <TextField
                  value={editCategory.name}
                  onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
                  variant="outlined"
                  size="small"
                />
                <Button type="submit" variant="contained" color="primary" size="small" sx={{ ml: 1 }}>
                  Сохранить
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setEditCategory(null)}
                  sx={{ ml: 1 }}
                >
                  Отмена
                </Button>
              </form>
            ) : (
              <>
                <ListItemText primary={category.name} />
                <IconButton onClick={() => setEditCategory(category)}>
                  <EditIcon />
                </IconButton>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default CategoryManager;