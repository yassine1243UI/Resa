import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

// Remplacez par votre clé publique Stripe
const stripePromise = loadStripe('pk_live_51RI6RpB69mHHexglluQuy57Hcl3HUDKWKilqmzkwFhXLcV6kwHv0hux8aL5dQUgWq525fagSaGr6xagQbRE0uM2D00GgWuIgSo');

const StripeWrapper = ({ amount }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
};

export default StripeWrapper;
