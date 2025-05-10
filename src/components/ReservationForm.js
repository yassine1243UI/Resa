import React, { useState, useEffect } from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { createReservation } from '../services/api';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './payment/CheckoutForm';

const stripePromise = loadStripe('pk_live_51RI6RpB69mHHexglluQuy57Hcl3HUDKWKilqmzkwFhXLcV6kwHv0hux8aL5dQUgWq525fagSaGr6xagQbRE0uM2D00GgWuIgSo');

const steps = ['Informations', 'Paiement'];

function ReservationForm({ event, onClose, onSuccess, initialData }) {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    nombre_places: '1'
  });
  const [reservationId, setReservationId] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        nom: initialData.nom || '',
        email: initialData.email || '',
        nombre_places: initialData.nombre_places?.toString() || '1'
      });
      handleNext();
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      setLoading(true);
      setError(null);

      try {
        const reservationData = {
          ...formData,
          evenement_id: event.id,
          nombre_places: parseInt(formData.nombre_places)
        };

        const response = await createReservation(reservationData);
        setReservationId(response.reservationId);
        setClientSecret(response.clientSecret);
        setActiveStep(1);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const montantTotal = event.prix * parseInt(formData.nombre_places || 0);

  return (
    <>
      <DialogTitle>
        Réserver pour {event.nom}
      </DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {activeStep === 0 ? (
          <Box component="form" sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Prix par place : {event.prix}€
            </Typography>
            <Typography variant="subtitle2" gutterBottom color="text.secondary">
              Places disponibles : {event.places_disponibles}
            </Typography>

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
              Total : {montantTotal.toFixed(2)}€
            </Typography>
          </Box>
        ) : (
          <Box sx={{ mt: 2 }}>
            {clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm 
                  amount={montantTotal}
                  reservationId={reservationId}
                  onSuccess={onSuccess}
                />
              </Elements>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Annuler
        </Button>
        {activeStep === 0 ? (
          <Button
            onClick={handleNext}
            variant="contained"
            color="primary"
            disabled={loading || !formData.nom || !formData.email || !formData.nombre_places}
          >
            {loading ? <CircularProgress size={24} /> : 'Continuer vers le paiement'}
          </Button>
        ) : (
          <Button onClick={handleBack}>
            Retour
          </Button>
        )}
      </DialogActions>
    </>
  );
}

export default ReservationForm;
