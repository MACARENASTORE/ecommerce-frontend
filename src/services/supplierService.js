import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

// Crear un nuevo proveedor
export const createSupplier = async (supplierData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_BASE_URL}/suppliers`, supplierData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Obtener todos los proveedores
export const fetchSuppliers = async () => { // Usar `fetchSuppliers` en lugar de `getSuppliers`
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE_URL}/suppliers`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Obtener proveedor por ID
export const getSupplierById = async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE_URL}/suppliers/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
