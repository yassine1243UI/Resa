import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../services/api';

function EventManager() {
  const [events, setEvents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    date_evenement: '',
    adresse: '',
    places_disponibles: '',
    prix: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await fetchEvents();
      setEvents(data);
    } catch (error) {
      showSnackbar(error.message, 'error');
    }
  };

  const handleOpenDialog = (event = null) => {
    if (event) {
      setSelectedEvent(event);
      setFormData({
        nom: event.nom || '',
        description: event.description || '',
        date_evenement: event.date_evenement ? event.date_evenement.split('T')[0] : '',
        adresse: event.adresse || '',
        places_disponibles: event.places_disponibles ? event.places_disponibles.toString() : '',
        prix: event.prix ? event.prix.toString() : ''
      });
    } else {
      setSelectedEvent(null);
      setFormData({
        nom: '',
        description: '',
        date_evenement: '',
        adresse: '',
        places_disponibles: '',
        prix: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEvent(null);
    setFormData({
      nom: '',
      description: '',
      date_evenement: '',
      adresse: '',
      places_disponibles: '',
      prix: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const eventData = {
        ...formData,
        prix: parseFloat(formData.prix),
        places_disponibles: parseInt(formData.places_disponibles)
      };

      if (selectedEvent) {
        await updateEvent(selectedEvent.id, eventData);
        showSnackbar('Événement modifié avec succès');
      } else {
        await createEvent(eventData);
        showSnackbar('Événement créé avec succès');
      }

      handleCloseDialog();
      loadEvents();
    } catch (error) {
      showSnackbar(error.message, 'error');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      try {
        await deleteEvent(eventId);
        // Mettre à jour l'état local immédiatement
        setEvents(currentEvents => currentEvents.filter(event => event.id !== eventId));
        showSnackbar('Événement supprimé avec succès');
      } catch (error) {
        showSnackbar(error.message, 'error');
        // En cas d'erreur, recharger tous les événements pour s'assurer de la synchronisation
        await loadEvents();
      }
    }
  };

  return (
    <Paper sx={{ p: 3, m: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Gestion des Événements</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog()}
        >
          Nouvel Événement
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>Places Disponibles</TableCell>
              <TableCell>Prix</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.nom}</TableCell>
                <TableCell>{event.description}</TableCell>
                <TableCell>{new Date(event.date_evenement).toLocaleDateString()}</TableCell>
                <TableCell>{event.adresse}</TableCell>
                <TableCell>{event.places_disponibles}</TableCell>
                <TableCell>{event.prix}€</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(event)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedEvent ? 'Modifier l\'événement' : 'Nouvel événement'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Nom de l'événement"
              name="nom"
              value={formData.nom}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              margin="normal"
              required
              multiline
              rows={3}
            />
            <TextField
              fullWidth
              label="Date"
              name="date_evenement"
              type="date"
              value={formData.date_evenement}
              onChange={handleInputChange}
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Adresse"
              name="adresse"
              value={formData.adresse}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Places disponibles"
              name="places_disponibles"
              type="number"
              value={formData.places_disponibles}
              onChange={handleInputChange}
              margin="normal"
              required
              InputProps={{ inputProps: { min: 1 } }}
            />
            <TextField
              fullWidth
              label="Prix"
              name="prix"
              type="number"
              value={formData.prix}
              onChange={handleInputChange}
              margin="normal"
              required
              InputProps={{ inputProps: { min: 0, step: "0.01" } }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {selectedEvent ? 'Modifier' : 'Créer'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default EventManager;
