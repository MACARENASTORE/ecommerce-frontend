import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

// Obtener todos los productos
export const fetchProducts = async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Error al obtener los productos');
    return response.json();
};

// Obtener un producto por ID
export const fetchProductById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Error al obtener el producto');
    return response.json();
};

// Crear un nuevo producto (solo para admin)
export const createProduct = async (productData) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Token de autenticación
        },
        body: productData, // Enviar el FormData en el cuerpo
    });
    if (!response.ok) throw new Error('Error al crear el producto');
    return response.json();
};

// Actualizar un producto existente (solo para admin)
export const updateProduct = async (id, productData) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Token de autenticación
        },
        body: productData,
    });
    if (!response.ok) throw new Error('Error al actualizar el producto');
    return response.json();
};

// Eliminar un producto (solo para admin)
export const deleteProduct = async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Token de autenticación
        },
    });
    if (!response.ok) throw new Error('Error al eliminar el producto');
    return response.json();
};

// Obtener productos destacados
export const fetchFeaturedProducts = async () => {
    const response = await axios.get(`${API_BASE_URL}/products/featured`);
    return response.data;
};