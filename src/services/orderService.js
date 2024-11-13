// src/services/orderService.js
import api from './axiosConfig';

/**
 * Obtiene todas las órdenes del usuario.
 * @returns {Promise<Array>} Lista de órdenes.
 */
export const fetchOrders = async () => {
    try {
        const response = await api.get('/orders');
        return response.data;
    } catch (error) {
        console.error('Error al obtener órdenes:', error);
        throw error;
    }
};

/**
 * Crea una orden desde el carrito actual, con dirección de envío y método de pago.
 * @param {Object} orderData - Datos de la orden, incluyendo dirección de envío y método de pago.
 * @returns {Promise<Object>} La orden creada.
 */
export const createOrder = async (orderData) => {
    try {
        const response = await api.post('/orders', orderData);
        return response.data;
    } catch (error) {
        console.error('Error al crear la orden:', error);
        throw error;
    }
};

/**
 * Obtiene todas las órdenes del sistema.
 * @returns {Promise<Array>} Lista de órdenes.
 */
export const fetchAllOrders = async () => {
    try {
        const response = await api.get('/orders');
        return response.data;
    } catch (error) {
        console.error('Error al obtener órdenes:', error);
        throw error;
    }
};

/**
 * Actualiza el estado de una orden específica.
 * @param {string} orderId - ID de la orden.
 * @param {string} status - Nuevo estado de la orden.
 * @returns {Promise<Object>} Orden actualizada.
 */
export const updateOrderStatus = async (orderId, status) => {
    try {
        const response = await api.put(`/orders/${orderId}/status`, { status });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el estado de la orden:', error);
        throw error;
    }
};