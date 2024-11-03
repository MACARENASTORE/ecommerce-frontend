// src/services/orderService.js
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

/**
 * Obtiene todas las órdenes desde la API.
 * @returns {Promise<Array>} Lista de órdenes.
 */
export const fetchOrders = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/orders`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener órdenes:", error);
        throw error;
    }
};
