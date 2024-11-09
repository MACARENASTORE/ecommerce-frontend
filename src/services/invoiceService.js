import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

// Obtener todas las facturas
export const fetchInvoices = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE_URL}/invoices`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Crear una nueva factura
export const createInvoice = async (invoiceData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_BASE_URL}/invoices`, invoiceData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
