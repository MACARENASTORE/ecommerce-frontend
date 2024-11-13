// src/services/authService.js
import api from './axiosConfig';

/**
 * Realiza una solicitud de inicio de sesión.
 * @param {Object} credentials - Credenciales de inicio de sesión.
 * @returns {Promise<Object>} Respuesta de autenticación.
 */
export const login = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        console.error('Error en el servicio de autenticación:', error);
        throw error;
    }
};

/**
 * Realiza una solicitud de registro de usuario.
 * @param {Object} data - Datos de registro del usuario.
 * @returns {Promise<Object>} Respuesta de autenticación.
 */
export const register = async (data) => {
    try {
        const response = await api.post('/auth/register', data);
        return response.data;
    } catch (error) {
        console.error('Error en el registro del usuario:', error);
        throw error;
    }
};

/**
 * Obtiene el perfil del usuario autenticado.
 * @param {string} token - Token de autenticación.
 * @returns {Promise<Object>} Perfil del usuario.
 */
export const getUserProfile = async () => {
    try {
        const response = await api.get('/auth/profile');
        return response.data;
    } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        throw error;
    }
};

/**
 * Obtiene la lista de todos los usuarios (solo para administradores).
 * @returns {Promise<Array>} Lista de usuarios.
 */
export const getAllUsers = async () => {
    try {
        const response = await api.get('/auth/users');
        return response.data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
};

/**
 * Actualiza un usuario específico (solo para administradores).
 * @param {string} id - ID del usuario a actualizar.
 * @param {Object} userData - Datos a actualizar.
 * @returns {Promise<Object>} Usuario actualizado.
 */
export const updateUser = async (id, userData) => {
    try {
        const response = await api.put(`/auth/users/${id}`, userData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        throw error;
    }
};

/**
 * Elimina un usuario específico (solo para administradores).
 * @param {string} id - ID del usuario a eliminar.
 * @returns {Promise<Object>} Respuesta de la eliminación.
 */
export const deleteUser = async (id) => {
    try {
        const response = await api.delete(`/auth/users/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        throw error;
    }
};
