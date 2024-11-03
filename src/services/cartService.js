// src/services/cartService.js
import { API_BASE_URL } from '../utils/constants';

// Función para agregar un producto al carrito
export const addToCart = async (productId, quantity = 1) => {
    const response = await fetch(`${API_BASE_URL}/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ productId, quantity })
    });

    if (!response.ok) {
        throw new Error('Error al agregar al carrito');
    }

    return response.json();
};

// Función para obtener el carrito del usuario
export const getCart = async () => {
    const response = await fetch(`${API_BASE_URL}/cart`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        throw new Error('Error al obtener el carrito');
    }

    return response.json();
};
