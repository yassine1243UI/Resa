import API_BASE_URL from '../config';

const handleResponse = (response) => {
  if (!response.ok) {
    throw new Error('Une erreur est survenue');
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

export const createEvent = async (eventData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/evenements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error('Impossible de créer l\'événement');
  }
};

export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/evenements/${eventId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error('Impossible de mettre à jour l\'événement');
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/evenements/${eventId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Impossible de supprimer l\'événement');
    }
  } catch (error) {
    throw new Error('Impossible de supprimer l\'événement');
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
