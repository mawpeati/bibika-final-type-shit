import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Listing } from '../services/api';
import './ListingCard.css';

interface ListingCardProps {
  listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  return (
    <Card className="listing-card">
      <CardMedia
        component="img"
        height="160"
        image={listing.imageUrl}
        alt={listing.title}
        className="listing-card-media"
      />
      <CardContent className="listing-card-content">
        <Typography gutterBottom variant="h6" component="div">
          {listing.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="listing-card-description">
          {listing.description.length > 50 ? `${listing.description.slice(0, 50)}...` : listing.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Категория: {listing.categoryName}
        </Typography>
        <Typography variant="h6" color="primary">
          ${listing.price}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/listing/${listing.id}`}
          className="listing-card-button"
        >
          Подробнее
        </Button>
      </CardContent>
    </Card>
  );
};

export default ListingCard;