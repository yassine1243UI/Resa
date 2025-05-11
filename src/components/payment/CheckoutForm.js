import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_live_51RI6RpB69mHHexglluQuy57Hcl3HUDKWKilqmzkwFhXLcV6kwHv0hux8aL5dQUgWq525fagSaGr6xagQbRE0uM2D00GgWuIgSo');
// const stripePromise = loadStripe('pk_test_51RI6SWBN1wIyqMvwQ8DawtkfxQVNkODBhH9iGzci3jwJWZMqeJnLXs5DY3b9BOff0YKhKcIYXjrSb72UsvVm0S1D00BnhA7aD6');
const CheckoutForm = ({ sessionId, amount }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (sessionId) {
      handlePayment();
    }
  }, [sessionId]);

  const handlePayment = async () => {
    if (!sessionId) {
      setError('Session de paiement non valide');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Impossible d\'initialiser Stripe');
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId
      });

      if (error) {
        throw error;
      }
    } catch (err) {

      setError(err.message || 'Une erreur est survenue lors de la redirection vers le paiement.');
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Montant à payer : {amount}€
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Button
        onClick={handlePayment}
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Procéder au paiement'}
      </Button>
    </Box>
  );
};

export default CheckoutForm;
