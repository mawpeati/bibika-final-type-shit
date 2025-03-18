import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getListings, Listing } from '../services/api';
import ListingCard from '../components/ListingCard';
import './CategoryListing.css';

const CategoryListings: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const allListings = await getListings();
        const filteredListings = allListings.filter(
          (listing) => listing.categoryName === categoryName
        );
        setListings(filteredListings);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };
    fetchListings();
  }, [categoryName]);

  return (
    <Container maxWidth="lg" className="category-container">
      <Typography variant="h4" gutterBottom className="category-title">
        Объявления в категории: {categoryName}
      </Typography>
      <Grid container spacing={3}>
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