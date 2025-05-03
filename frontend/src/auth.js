import axios from 'axios';

// URL de ton backend Django
const API_URL = "http://localhost:8000/api";

// Fonction de login
export async function loginUser(credentials) {
  try {
    const response = await axios.post(`${API_URL}/token/`, credentials);
    localStorage.setItem('access', response.data.access);
    localStorage.setItem('refresh', response.data.refresh);
    return response.data;
  } catch (error) {
    console.error("Erreur de connexion", error);
    throw error;
  }
}

// Fonction pour récupérer le token de rafraîchissement
export async function refreshAccessToken() {
  const refresh = localStorage.getItem('refresh');
  if (!refresh) throw new Error("No refresh token found");

  try {
    const response = await axios.post(`${API_URL}/token/refresh/`, { refresh });
    localStorage.setItem('access', response.data.access);
    return response.data.access;
  } catch (error) {
    console.error("Erreur lors du rafraîchissement du token", error);
    throw error;
  }
}
