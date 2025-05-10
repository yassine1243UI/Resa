import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Box,
  Alert
} from '@mui/material';
import EventCard from './EventCard';
import { fetchEvents } from '../services/api';

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadEvents = async () => {
    try {
      const data = await fetchEvents();
      setEvents(data);
      setError(null);
    } catch (error) {
      console.error('Erreur:', error);
      setError('Impossible de charger les événements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Événements disponibles 
      </Typography>
      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item key={event.id} xs={12} md={6}>
            <EventCard 
              event={event}
              onReserve={loadEvents}
            />
          </Grid>
        ))}
        {events.length === 0 && (
          <Grid item xs={12}>
            <Alert severity="info">
              Aucun événement disponible pour le moment.
            </Alert>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default EventList;
