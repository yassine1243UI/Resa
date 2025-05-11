import React, { useEffect, useRef } from 'react';

const PayPalButton = ({ amount, onSuccess }) => {
  const paypalRef = useRef();

  useEffect(() => {
    if (!window.paypal) return;

    window.paypal.Buttons({
      createOrder: (data, actions) => actions.order.create({
        purchase_units: [{
          amount: {
            value: amount.toString(),
          },
        }],
      }),
      onApprove: (data, actions) => actions.order.capture().then(onSuccess),
      onError: (err) => {

        alert('Erreur lors du paiement PayPal.');
      }
    }).render(paypalRef.current);
  }, [amount]);

  return <div ref={paypalRef} />;
};

export default PayPalButton;
