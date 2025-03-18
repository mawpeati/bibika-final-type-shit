import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getListings, Listing } from '../services/api';
import ListingCard from '../components/ListingCard';

const CategoryListings: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const allListings = await getListings();
        const filteredListings = allListings.filter((listing) => listing.categoryId === categoryId);
        setListings(filteredListings);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };
    fetchListings();
  }, [categoryId]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Объявления в категории
      </Typography>
      <Grid container spacing={2}>
        {listings.map((listing) => (
          <Grid item xs={12} sm={6} md={4} key={listing.id}>
            <ListingCard listing={listing} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CategoryListings;