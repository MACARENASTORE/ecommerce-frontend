// src/services/categoryService.js
const API_URL = "http://localhost:3009/api/categories";

export const categoryService = {
    getCategories: async () => {
        const response = await fetch(API_URL);
        return response.json();
    }
};
