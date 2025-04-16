import axios from 'axios';
import { LoginCredentials, User } from '../types';

const API_URL = 'http://tu-backend-url/api'; // Reemplazar con la URL real del backend

export const loginService = async (credentials: LoginCredentials): Promise<{ token: string; user: User }> => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error en el servicio de login:', error);
    throw error;
  }
};

export const validateToken = async (token: string): Promise<boolean> => {
  try {
    await axios.get(`${API_URL}/validate-token`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return true;
  } catch (error) {
    return false;
  }
}; 