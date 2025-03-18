import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getListings, Listing } from '../services/api';
import './ListingDetail.css';

const ListingDetail: React.FC = () => {
  const { listingId } = useParams<{ listingId: string }>();
  const navigate = useNavigate();
  const [listing, setListing] = useState<Listing | null>(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const allListings = await getListings();
        const foundListing = allListings.find((l) => l.id === listingId);
        setListing(foundListing || null);
      } catch (error) {
        console.error('Error fetching listing:', error);
      }
    };
    fetchListing();
  }, [listingId]);

  if (!listing) return <Typography>Объявление не найдено</Typography>;

  return (
    <Container maxWidth="md" className="detail-container">
      <Card className="detail-card">
        <CardMedia
          component="img"
          height="400"
          image={listing.imageUrl}
          alt={listing.title}
          className="detail-media"
        />
        <CardContent className="detail-content">
          <Typography variant="h4" gutterBottom className="detail-title">
            {listing.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" className="detail-description">
            {listing.description}
          </Typography>
          <Typography variant="h6" color="text.secondary" className="detail-category">
            Категория: {listing.categoryName}
          </Typography>
          <Typography variant="h5" color="primary" className="detail-price">
            ${listing.price}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate(`/edit/${listingId}`)}
            className="detail-button"
          >
            Редактировать
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ListingDetail;