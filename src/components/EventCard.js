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
import { CalendarMonth, LocationOn, Euro, AccessTime  } from '@mui/icons-material';
import { createReservation } from '../services/api';
import ReservationForm from './ReservationForm';
import axios from 'axios';
import WaitlistForm from './WaitlistForm';
import API_BASE_URL from '../config';


function EventCard({ event, onReserve }) {
  const [isReserving, setIsReserving] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [nombre_places, setNombrePlaces] = useState(1);
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [acceptCGV, setAcceptCGV] = useState(false);
  const [nomWait, setNomWait] = useState('');
  const [prenomWait, setPrenomWait] = useState('');
  const [emailWait, setEmailWait] = useState('');
  const [placesWait, setPlacesWait] = useState(1);
  const [errorWait, setErrorWait] = useState('');
  const [successWait, setSuccessWait] = useState('');
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);


  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    setErrorWait('');
    setSuccessWait('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom: nomWait,
          prenom: prenomWait,
          email: emailWait,
          places_souhaitees: placesWait,
          evenement: event.nom
        }),
      });

      if (response.ok) {
        setSuccessWait('Votre inscription à la liste d\'attente a bien été prise en compte.');
        setNomWait('');
        setPrenomWait('');
        setEmailWait('');
        setPlacesWait(1);
      } else {
        const error = await response.text();
        setErrorWait(error || 'Une erreur est survenue');
      }
    } catch (error) {
      setErrorWait('Une erreur est survenue lors de l\'inscription');
      console.error('Erreur:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire
  
    if (nombre_places < 1) {
      alert("Veuillez sélectionner au moins une place.");
      return;
    }
  
    try {
      // Envoie la requête au serveur pour créer une session Stripe
      const res = await axios.post(`${API_BASE_URL}/create-checkout-session`, {
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
  const presqueComplet = event.places_disponibles <= 10 && event.places_disponibles > 0;

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

          <Box display="flex" alignItems="center">
            <CalendarMonth sx={{ mr: 1 }} color="action" />
            <Typography variant="body2">
              {new Date(event.date_evenement).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
              })}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" mt={0.5}>
            <AccessTime sx={{ mr: 1 }} color="action" />
            <Typography variant="body2">
              {new Date(event.date_evenement).toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
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
          {event.places_disponibles === 0 ? (
  <>
    <Typography color="error" sx={{ mt: 2 }}>
      Toutes les places sont prises. Vous pouvez vous inscrire à la liste d'attente :
    </Typography>

    <Button
      variant="outlined"
      color="primary"
      onClick={() => setIsWaitlistOpen(!isWaitlistOpen)}
      sx={{ mt: 2 }}
    >
      {isWaitlistOpen ? 'Annuler' : 'S’inscrire à la liste d’attente'}
    </Button>

    <Collapse in={isWaitlistOpen}>
      <Box component="form" onSubmit={handleWaitlistSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Nom"
          value={nomWait}
          onChange={(e) => setNomWait(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Prénom"
          value={prenomWait}
          onChange={(e) => setPrenomWait(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Email"
          type="email"
          value={emailWait}
          onChange={(e) => setEmailWait(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Nombre de places souhaitées"
          type="number"
          value={placesWait}
          onChange={(e) => setPlacesWait(parseInt(e.target.value))}
          fullWidth
          required
          margin="normal"
          InputProps={{ inputProps: { min: 1 } }}
        />

        {errorWait && (
          <Typography color="error" sx={{ mt: 1 }}>
            {errorWait}
          </Typography>
        )}
        {successWait && (
          <Typography color="primary" sx={{ mt: 1 }}>
            {successWait}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={!nomWait || !prenomWait || !emailWait || !placesWait}
        >
          Confirmer l’inscription
        </Button>
      </Box>
    </Collapse>
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
