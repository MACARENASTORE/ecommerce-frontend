// src/services/supplierService.js
const API_URL = "http://localhost:3009/api/suppliers";

export const supplierService = {
    getSuppliers: async () => {
        const response = await fetch(API_URL);
        return response.json();
    },

    getSupplierById: async (id) => {
        const response = await fetch(`${API_URL}/${id}`);
        return response.json();
    }
};
