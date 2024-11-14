// src/services/categoryService.js
import { API_BASE_URL } from '../utils/constants';

// Obtener todas las categorías
export const fetchCategories = async () => {
    const response = await fetch(`${API_BASE_URL}/categories`);
    return response.json();
};

// Crear una nueva categoría
export const createCategory = async (categoryData) => {
    const response = await fetch(`${API_BASE_URL}/categories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(categoryData),
    });
    return response.json();
};

// Actualizar una categoría existente
export const updateCategory = async (id, categoryData) => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(categoryData),
    });
    return response.json();
};

// Eliminar una categoría
export const deleteCategory = async (id) => {
    await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
};

// Obtener una categoría por ID y sus productos
export const fetchCategoryWithProducts = async (categoryId) => {
    const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`);
    if (!response.ok) throw new Error('Error al obtener la categoría');
    return response.json();
};
