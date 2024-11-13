// src/services/axiosConfig.js
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
    baseURL: API_BASE_URL, // URL base de la API
});

// Interceptor para agregar el token en el encabezado de autorización
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Obtiene el token del almacenamiento local
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Agrega el token en el encabezado
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
    response => response, // Si la respuesta es exitosa, simplemente la retorna
    error => {
        if (error.response && error.response.status === 401) {
            // Si el servidor responde con 401, el token es inválido o ha expirado
            alert("La sesión ha expirado. Por favor, inicia sesión nuevamente.");
            localStorage.removeItem('token'); // Opcional: elimina el token del almacenamiento
            window.location.href = "/login"; // Redirige al usuario a la página de inicio de sesión
        }
        return Promise.reject(error); // Retorna el error para que pueda ser manejado por el código llamante
    }
);

export default api;
