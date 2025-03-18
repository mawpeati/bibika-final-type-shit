import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { getListings, Listing } from '../services/api';
import ListingCard from '../components/ListingCard';

const Home: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsData = await getListings();
        setListings(listingsData);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };
    fetchListings();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Все объявления
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

export default Home;