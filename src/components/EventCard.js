import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Button,
  TextField,
  Collapse
} from '@mui/material';
import { CalendarMonth, LocationOn, Euro } from '@mui/icons-material';
import { createReservation } from '../services/api';

function EventCard({ event, onReserve }) {
  const [isReserving, setIsReserving] = useState(false);
  const [nombrePlaces, setNombrePlaces] = useState(1);
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReservation({
        evenement_id: event.id,
        nombre_places: nombrePlaces,
        nom,
        email
      });
      setIsReserving(false);
      if (onReserve) onReserve();
      setNombrePlaces(1);
      setNom('');
      setEmail('');
      setError('');
    } catch (err) {
      setError('Erreur lors de la réservation');
    }
  };

  const isComplet = event.places_disponibles <= 0;
  const presqueComplet = event.places_disponibles <= 5 && event.places_disponibles > 0;

  const getStatusText = () => {
    if (isComplet) return 'COMPLET';
    if (presqueComplet) return `DERNIÈRES PLACES !`;
    return ` places disponibles`;
  };

  const getStatusColor = () => {
    if (isComplet) return 'error.main';
    if (presqueComplet) return 'warning.main';
    return 'success.main';
  };

  return (
    <Paper elevation={3} sx={{ mb: 2 }}>
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            {event.nom}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" paragraph>
            {event.description}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <CalendarMonth sx={{ mr: 1 }} color="action" />
            <Typography variant="body2">
              {new Date(event.date_evenement).toLocaleDateString()}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LocationOn sx={{ mr: 1 }} color="action" />
            <Typography variant="body2">{event.adresse}</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" color="primary">
              <Euro sx={{ mr: 1, verticalAlign: 'middle' }} />
              {event.prix}€
            </Typography>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                bgcolor: getStatusColor(),
                color: 'white',
                px: 2,
                py: 0.5,
                borderRadius: 1,
                fontWeight: presqueComplet ? 'bold' : 'normal'
              }}
            >
              {getStatusText()}
            </Typography>
          </Box>

          {!isComplet && (
            <>
              <Button
                variant={isReserving ? "outlined" : "contained"}
                color={presqueComplet ? "warning" : "primary"}
                fullWidth
                onClick={() => setIsReserving(!isReserving)}
              >
                {isReserving ? 'Annuler' : 'Réserver'}
              </Button>

              <Collapse in={isReserving}>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                  <TextField
                    label="Nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                  />
                  <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                  />
                  <TextField
                    label="Nombre de places"
                    type="number"
                    value={nombrePlaces}
                    onChange={(e) => setNombrePlaces(parseInt(e.target.value))}
                    fullWidth
                    required
                    margin="normal"
                    InputProps={{ inputProps: { min: 1, max: event.places_disponibles } }}
                  />
                  {error && (
                    <Typography color="error" sx={{ mt: 1 }}>
                      {error}
                    </Typography>
                  )}
                  <Button
                    type="submit"
                    variant="contained"
                    color={presqueComplet ? "warning" : "primary"}
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Confirmer la réservation
                  </Button>
                </Box>
              </Collapse>
            </>
          )}
        </CardContent>
      </Card>
    </Paper>
  );
}

export default EventCard;
