import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Listing } from '../types';

interface ListingCardProps {
  listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={listing.imageUrl}
        alt={listing.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {listing.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {listing.description}
        </Typography>
        <Typography variant="h6" color="text.primary">
          ${listing.price}
        </Typography>
        <Button component={Link} to={`/listing/${listing.id}`} variant="contained" sx={{ mt: 2 }}>
          Подробнее
        </Button>
      </CardContent>
    </Card>
  );
};

export default ListingCard;