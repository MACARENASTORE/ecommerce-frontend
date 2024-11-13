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

/**
 * Crea una orden desde el carrito actual con dirección de envío y método de pago.
 * @param {Object} orderData - Datos de la orden incluyendo dirección de envío y método de pago.
 * @returns {Promise<Object>} Datos de la orden creada.
 */
export const createOrder = async (orderData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
        return response.data;
    } catch (error) {
        console.error("Error al crear la orden:", error);
        throw error;
    }
};
