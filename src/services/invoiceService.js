
import api from './axiosConfig';

export const fetchInvoices = async () => {
    const response = await api.get('/invoices');
    return response.data;
};

export const createInvoice = async (invoiceData) => {
    const response = await api.post('/invoices', invoiceData);
    return response.data;
};

export const fetchInvoiceById = async (id) => {
    const response = await api.get(`/invoices/${id}`);
    return response.data;
};

