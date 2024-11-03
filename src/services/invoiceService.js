// src/services/invoiceService.js
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

/**
 * Obtiene todas las facturas desde la API.
 * @returns {Promise<Array>} Lista de facturas.
 */
export const fetchInvoices = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/invoices`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener facturas:", error);
        throw error;
    }
};
