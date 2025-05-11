import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Grid,
  MenuItem,
  Collapse,
  Paper
} from '@mui/material';

function WaitlistForm() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    evenement: '',
    places_souhaitees: 1
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('https://resaback-production.up.railway.app/api/evenements');
        const data = await res.json();
        setEvents(data);
      } catch (err) {

      }
    };
    fetchEvents();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const cleanData = {
        ...formData,
        evenement: formData.evenement || 'Peu importe'
      };
  
      const res = await fetch('https://resaback-production.up.railway.app/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanData)
      });
  
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('Erreur lors de l’inscription');
      }
    } catch (err) {

      alert('Erreur réseau');
    }
  };
  

  return (
    <Paper
      elevation={8}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        p: 3,
        backgroundColor: '#fff',
        zIndex: 1300,
        borderTop: '1px solid #ccc'
      }}
    >
      <Collapse in={!showForm}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          <Typography variant="body1">
            Restez informé ! Inscrivez-vous à notre liste d’attente pour être averti des prochains événements.
          </Typography>
          <Button
            variant="contained"
            onClick={() => setShowForm(true)}
            sx={{ mt: { xs: 2, sm: 0 } }}
          >
            Je suis intéressé
          </Button>
        </Box>
      </Collapse>

      <Collapse in={showForm}>
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>
            Liste d’attente
          </Typography>

          {submitted ? (
            <Alert severity="success">
              Merci ! Vous serez prévenu dès qu’une place sera disponible.
            </Alert>
          ) : (
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Prénom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    select
                    label="Événement"
                    name="evenement"
                    value={formData.evenement}
                    onChange={handleChange}
                    fullWidth
                    sx={{ minWidth: 200 }}
                  >
                    <MenuItem value="Peu importe">Peu importe l’événement</MenuItem>
                    {events.map(event => (
                      <MenuItem key={event.id} value={event.nom}>
                        {event.nom}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Nombre de places souhaitées"
                    name="places_souhaitees"
                    type="number"
                    value={formData.places_souhaitees}
                    onChange={handleChange}
                    fullWidth
                    required
                    inputProps={{ min: 1 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="space-between">
                    <Button variant="outlined" onClick={() => setShowForm(false)}>
                      Retour
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                      S’inscrire
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Collapse>
    </Paper>
  );
}

export default WaitlistForm;
