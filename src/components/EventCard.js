import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Button,
  TextField,
  Collapse,
  Dialog,
  Checkbox, FormControlLabel, Link
} from '@mui/material';
import { CalendarMonth, LocationOn, Euro } from '@mui/icons-material';
import { createReservation } from '../services/api';
import ReservationForm from './ReservationForm';
import axios from 'axios';
import WaitlistForm from './WaitlistForm';


function EventCard({ event, onReserve }) {
  const [isReserving, setIsReserving] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [nombre_places, setNombrePlaces] = useState(1);
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [acceptCGV, setAcceptCGV] = useState(false); // État pour la case à cocher

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire
  
    if (nombre_places < 1) {
      alert("Veuillez sélectionner au moins une place.");
      return;
    }
  
    try {
      // Envoie la requête au serveur pour créer une session Stripe
      const res = await axios.post('https://resaback-production.up.railway.app/create-checkout-session', {
        quantity: nombre_places,
        nom,
        email,
        eventId: event.id,
      });
  
      // Récupère l'URL de redirection à partir de la réponse du serveur
      const checkoutUrl = res.data.url;
  
      if (checkoutUrl) {
        console.log("Redirection vers Stripe :", checkoutUrl);
        window.location.href = checkoutUrl; // Redirige l'utilisateur vers Stripe
      } else {
        console.error("Aucune URL de session trouvée dans la réponse.");
        alert("Une erreur est survenue lors de la création de la session de paiement.");
      }
    } catch (err) {
      console.error('Erreur lors de la redirection vers le paiement:', err);
      alert("Erreur lors de la redirection vers le paiement.");
    }
  };
  


  const handlePaymentSuccess = () => {
    setShowPaymentDialog(false);
    setIsReserving(false);
    if (onReserve) onReserve();
    setNombrePlaces(1);
    setNom('');
    setEmail('');
    setError('');
  };

  const handlePaymentCancel = () => {
    setShowPaymentDialog(false);
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
          {isComplet ? (
  <>
    <Typography color="error" sx={{ mt: 2, mb: 1 }}>
      Toutes les places sont prises. Vous pouvez vous inscrire à la liste d'attente :
    </Typography>
    <WaitlistForm eventName={event.nom} />
  </>
) : (
  <>
    <Button
      variant="contained"
      color="primary"
      fullWidth
      onClick={() => setIsReserving(!isReserving)}
      sx={{ mb: 2 }}
    >
      {isReserving ? 'Annuler' : 'Réserver'}
    </Button>

    <Collapse in={isReserving}>
  <Box component="form" onSubmit={handleSubmit}>
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
      value={nombre_places}
      onChange={(e) => setNombrePlaces(parseInt(e.target.value))}
      fullWidth
      required
      margin="normal"
      InputProps={{ inputProps: { min: 1, max: event.places_disponibles } }}
    />

    <FormControlLabel
      control={
        <Checkbox
          checked={acceptCGV}
          onChange={(e) => setAcceptCGV(e.target.checked)}
          required
        />
      }
      label={
        <>
          J’accepte les{' '}
          <Link href="/cgv" target="_blank" rel="noopener noreferrer">
            Conditions Générales de Vente
          </Link>
        </>
      }
    />

    {error && (
      <Typography color="error" sx={{ mt: 1 }}>
        {error}
      </Typography>
    )}

    <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={!nom || !email || !nombre_places || !acceptCGV}
    >
      Confirmer la réservation
    </Button>
  </Box>
</Collapse>
  </>
)}

        </CardContent>
      </Card>

      <Dialog
        open={showPaymentDialog}
        onClose={handlePaymentCancel}
        maxWidth="sm"
        fullWidth
      >
        <ReservationForm
          event={event}
          onClose={handlePaymentCancel}
          onSuccess={handlePaymentSuccess}
          initialData={{
            nom,
            email,
            nombre_places: nombre_places
          }}
        />
      </Dialog>
    </Paper>
  );
}

export default EventCard;
