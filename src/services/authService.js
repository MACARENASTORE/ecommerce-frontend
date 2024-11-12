// src/services/authService.js
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

// Función de inicio de sesión
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

    return data; // Retorna el objeto completo para obtener el token y el perfil del usuario
};

// Función de registro de usuario
export const register = async (data) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Error en el registro');
    }

    return result;
};

// Función para obtener el perfil del usuario autenticado
export const getUserProfile = async (token) => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error al obtener el perfil');
    }

    return data;
};

// Función para obtener todos los usuarios (para administración)
export const getAllUsers = async () => {
    const token = localStorage.getItem('token'); // Obtener token del almacenamiento local
    const response = await axios.get(`${API_BASE_URL}/auth/users`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.status === 200) {
        throw new Error('Error al obtener usuarios');
    }

    return response.data;
};

// Función para actualizar un usuario (para administración)
export const updateUser = async (id, userData) => {
    const token = localStorage.getItem('token'); // Obtener token del almacenamiento local
    const response = await axios.put(`${API_BASE_URL}/auth/users/${id}`, userData, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.status === 200) {
        throw new Error('Error al actualizar el usuario');
    }

    return response.data;
};

// Función para eliminar un usuario (para administración)
export const deleteUser = async (id) => {
    const token = localStorage.getItem('token'); // Obtener token del almacenamiento local
    const response = await axios.delete(`${API_BASE_URL}/auth/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.status === 200) {
        throw new Error('Error al eliminar el usuario');
    }

    return response.data;
};
