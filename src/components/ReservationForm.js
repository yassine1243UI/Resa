import React, { useState } from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';
import { createReservation } from '../services/api';

function ReservationForm({ event, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    nombre_places: '1'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const reservationData = {
        ...formData,
        evenement_id: event.id,
        nombre_places: parseInt(formData.nombre_places)
      };

      await createReservation(reservationData);
      onSuccess();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DialogTitle>
        Réserver pour {event.nom}
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Prix par place : {event.prix}€
          </Typography>
          <Typography variant="subtitle2" gutterBottom color="text.secondary">
            Places disponibles : {event.places_disponibles}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Nom"
            name="nom"
            value={formData.nom}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Nombre de places"
            name="nombre_places"
            type="number"
            value={formData.nombre_places}
            onChange={handleInputChange}
            margin="normal"
            required
            InputProps={{
              inputProps: {
                min: 1,
                max: event.places_disponibles
              }
            }}
          />

          <Typography variant="h6" sx={{ mt: 2 }}>
            Total : {(event.prix * parseInt(formData.nombre_places || 0)).toFixed(2)}€
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Annuler
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Réserver'}
        </Button>
      </DialogActions>
    </>
  );
}

export default ReservationForm;
