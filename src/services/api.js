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
    // Première étape : créer la réservation
    const reservationResponse = await fetch(`${API_BASE_URL}/api/reserver`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nom: reservationData.nom,
        email: reservationData.email,
        "Nombre de place": reservationData.nombre_places,
        evenement_id: reservationData.evenement_id
      }),
    });
    const reservationResult = await handleResponse(reservationResponse);

    // Deuxième étape : créer la session de paiement Stripe
    const checkoutResponse = await fetch(`${API_BASE_URL}/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventId: reservationData.evenement_id,
        quantity: parseInt(reservationData.nombre_places),
        reservationId: reservationResult.reservationId
      }),
    });
    const checkoutResult = await handleResponse(checkoutResponse);

    return {
      reservationId: reservationResult.reservationId,
      clientSecret: checkoutResult.id // Utiliser l'ID de la session comme clientSecret
    };
  } catch (error) {
    throw new Error(error.message || 'Impossible de créer la réservation');
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
