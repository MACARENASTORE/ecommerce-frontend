// src/services/authService.js
import { API_BASE_URL } from '../utils/constants';

export const login = async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error en la autenticación');
    }

    return data;  // Retorna el objeto completo para obtener el token y el perfil del usuario
};

export const register = async (data) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return response.json();
};

export const getUserProfile = async (token) => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
};
