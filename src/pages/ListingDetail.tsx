import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getListings, Listing } from '../services/api';

const ListingDetail: React.FC = () => {
  const { listingId } = useParams<{ listingId: string }>();
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
    <Container sx={{ mt: 4 }}>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={listing.imageUrl}
          alt={listing.title}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {listing.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {listing.description}
          </Typography>
          <Typography variant="h5" color="text.primary">
            ${listing.price}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ListingDetail;