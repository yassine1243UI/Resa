import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { TextField, Button, Box, Paper, Typography, Grid } from '@mui/material';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    price: '',
    capacity: ''
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events`);
      setEvents(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des événements:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/events`, newEvent);
      setNewEvent({
        name: '',
        description: '',
        date: '',
        location: '',
        price: '',
        capacity: ''
      });
      fetchEvents();
    } catch (error) {
      console.error('Erreur lors de la création de l\'événement:', error);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Créer un nouvel événement
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Nom de l'événement"
                  name="name"
                  value={newEvent.name}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={newEvent.description}
                  onChange={handleInputChange}
                  margin="normal"
                  multiline
                  rows={4}
                  required
                />
                <TextField
                  fullWidth
                  label="Date"
                  name="date"
                  type="datetime-local"
                  value={newEvent.date}
                  onChange={handleInputChange}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  required
                />
                <TextField
                  fullWidth
                  label="Lieu"
                  name="location"
                  value={newEvent.location}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Prix"
                  name="price"
                  type="number"
                  value={newEvent.price}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Capacité"
                  name="capacity"
                  type="number"
                  value={newEvent.capacity}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Créer l'événement
                </Button>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Liste des événements
              </Typography>
              {events.map((event) => (
                <Paper key={event._id} sx={{ p: 2, mb: 2 }}>
                  <Typography variant="h6">{event.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.description}
                  </Typography>
                  <Typography>Date: {new Date(event.date).toLocaleString()}</Typography>
                  <Typography>Lieu: {event.location}</Typography>
                  <Typography>Prix: {event.price}€</Typography>
                  <Typography>Capacité: {event.capacity} places</Typography>
                </Paper>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default EventManagement;
