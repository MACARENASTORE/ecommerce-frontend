// src/pages/Invoices.js
import React, { useEffect, useState } from 'react';
import { fetchInvoices } from '../services/invoiceService';

const Invoices = () => {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        const loadInvoices = async () => {
            try {
                const data = await fetchInvoices();
                setInvoices(data);
            } catch (error) {
                console.error("Error al cargar facturas:", error);
            }
        };
        loadInvoices();
    }, []);

    return (
        <div>
            <h2>Lista de Facturas</h2>
            <ul>
                {invoices.map(invoice => (
                    <li key={invoice._id}>
                        Factura N°: {invoice.invoiceNumber} - Total: ${invoice.totalAmount.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Invoices;
