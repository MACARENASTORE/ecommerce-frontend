// src/services/productService.js
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

// Configuración de instancia de Axios
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
});

// Manejar errores
const handleError = (error) => {
    console.error('API Error:', error);
    throw new Error(error.response?.data?.message || 'Error en la solicitud');
};

// Obtener todos los productos
export const fetchProducts = async () => {
    try {
        const response = await axiosInstance.get('/products');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Obtener un producto por ID
export const fetchProductById = async (id) => {
    try {
        const response = await axiosInstance.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Crear un nuevo producto (solo para admin)
export const createProduct = async (productData) => {
    try {
        const response = await axiosInstance.post('/products', productData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Para el envío de archivos con FormData
            },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Actualizar un producto existente (solo para admin)
export const updateProduct = async (id, productData) => {
    try {
        const response = await axiosInstance.put(`/products/${id}`, productData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Para el envío de archivos con FormData
            },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Eliminar un producto (solo para admin)
export const deleteProduct = async (id) => {
    try {
        const response = await axiosInstance.delete(`/products/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Obtener productos destacados
export const fetchFeaturedProducts = async () => {
    try {
        const response = await axiosInstance.get('/products/featured');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Buscar productos por una consulta
export const searchProducts = async (query) => {
    try {
        const response = await axiosInstance.get(`/products/search?query=${query}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};
