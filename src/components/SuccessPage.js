import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress, Alert, Container } from '@mui/material';

const SuccessPage = () => {
  const [status, setStatus] = useState('pending');
  
  useEffect(() => {
    // Lire les informations depuis les cookies
    const cookies = document.cookie.split(';');
    let sessionId = '';
    let eventId = '';
    let quantity = 0;

    // Chercher les cookies et extraire les informations nécessaires
    cookies.forEach((cookie) => {
      if (cookie.trim().startsWith('paymentData=')) {
        const paymentData = JSON.parse(cookie.split('=')[1]);
        sessionId = paymentData.sessionId;
        eventId = paymentData.eventId;
        quantity = paymentData.quantity;
      }
    });

    console.log('sessionId:', sessionId, 'eventId:', eventId, 'quantity:', quantity);  // Ajoute un log pour vérifier

    if (sessionId && eventId && quantity) {
      // Envoi des données via POST
      axios.post('https://resaback-production.up.railway.app/api/verify-payment', {
        sessionId,
        eventId,
        quantity
      })
        .then((response) => {
          console.log('Vérification du paiement réussie :', response.data);
          if (response.data.success) {
            setStatus('success');
          } else {
            setStatus('error');
          }
        })
        .catch((error) => {
          console.error('Erreur lors de la vérification du paiement :', error);
          setStatus('error');
        });
    } else {
      console.error('Paramètres manquants dans les cookies.');
      setStatus('error');
    }
  }, []);

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px', textAlign: 'center' }}>
      {status === 'pending' && (
        <>
          <CircularProgress />
          <p>Vérification du paiement en cours...</p>
        </>
      )}

      {status === 'success' && (
        <Alert severity="success">
          Paiement confirmé ! Votre réservation a bien été prise en compte.
        </Alert>
      )}

      {status === 'error' && (
        <Alert severity="error">
          Une erreur est survenue. Votre paiement n'a pas été validé.
        </Alert>
      )}

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          onClick={() => window.location.href = '/'}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
        >
          ⬅ Retour à l'accueil
        </button>
      </div>
    </Container>
  );
};

export default SuccessPage;
