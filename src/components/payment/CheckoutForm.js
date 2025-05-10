import React, { useState } from 'react';
import axios from 'axios';

const CheckoutForm = () => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    if (quantity < 1) {
      alert('Veuillez sélectionner au moins une place.');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('https://resaback-production.up.railway.app/create-checkout-session', {
        quantity,
      });
      window.location.href = res.data.url; // Redirection vers Stripe Checkout
    } catch (err) {
      console.error('Erreur lors de la création de la session :', err);
      alert("Impossible de créer la session de paiement.");
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Réserver des places</h2>

      <label>
        Nombre de places :
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          style={{ marginLeft: '10px', width: '60px' }}
          disabled={loading}
        />
      </label>

      <br /><br />

      <button
        onClick={handleBuy}
        style={{ padding: '10px 20px' }}
        disabled={loading}
      >
        {loading ? 'Redirection en cours...' : 'Confirmer la réservation'}
      </button>
    </div>
  );
};

export default CheckoutForm;
