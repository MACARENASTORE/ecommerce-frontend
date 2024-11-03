// src/services/productService.js
import { API_BASE_URL } from '../utils/constants';

export const fetchProducts = async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    return response.json();
};

export const fetchProductById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return response.json();
};
