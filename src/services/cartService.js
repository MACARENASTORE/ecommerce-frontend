// src/services/cartService.js
import api from './axiosConfig';

// Obtener el carrito del usuario
export const getCart = async () => {
    try {
        const response = await api.get('/cart');
        return response.data;
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        throw error;
    }
};

// Actualizar la cantidad de un producto en el carrito
export const updateCartItem = async (productId, quantity) => {
    try {
        const response = await api.put(`/cart/${productId}`, { quantity });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar la cantidad del producto en el carrito:', error);
        throw error;
    }
};

// Eliminar un producto del carrito
export const removeCartItem = async (productId) => {
    try {
        const response = await api.delete(`/cart/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el producto del carrito:', error);
        throw error;
    }
};

// Agregar un producto al carrito
export const addToCart = async (productId, quantity = 1) => {
    try {
        const response = await api.post('/cart', { productId, quantity });
        return response.data;
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
        throw error;
    }
};
