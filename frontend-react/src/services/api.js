import API_BASE_URL from '../config';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Une erreur est survenue');
  }
  return response.json();
};

export const fetchEvents = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/evenements`);
    return handleResponse(response);
  } catch (error) {
    throw new Error('Impossible de récupérer les événements');
  }
};

export const createReservation = async (reservationData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationData),
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error('Impossible de créer la réservation');
  }
};

export const getStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/stats`);
    return handleResponse(response);
  } catch (error) {
    throw new Error('Impossible de récupérer les statistiques');
  }
};
