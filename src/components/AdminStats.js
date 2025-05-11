import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  CircularProgress,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { getStats } from '../services/api';

function AdminStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStats();
        setStats(data);

        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" m={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3, m: 3 }}>
        <Typography color="error">Erreur: {error}</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3, m: 3 }}>
      <Typography variant="h5" gutterBottom>
        Statistiques des Réservations
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total des Réservations
              </Typography>
              <Typography variant="h4">
                {stats?.totalReservations || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Billets Vendus
              </Typography>
              <Typography variant="h4">
                {stats?.totalTickets || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Revenus Totaux
              </Typography>
              <Typography variant="h4">
                {stats?.totalRevenue ? `${stats.totalRevenue}€` : '0€'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default AdminStats;
