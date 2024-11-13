// src/components/invoice/InvoiceModal.js
import React from 'react';
import './InvoiceModal.css';

const InvoiceModal = ({ invoice, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Detalles de la Factura</h2>
                <button className="close-button" onClick={onClose}>X</button>
                <p><strong>Número de Factura:</strong> {invoice.invoiceNumber}</p>
                <p><strong>Proveedor:</strong> {invoice.supplierId.name}</p>
                <p><strong>Total:</strong> ${invoice.totalAmount}</p>

                <h3>Productos</h3>
                <ul>
                    {invoice.products.map((product, index) => (
                        <li key={index}>
                            <strong>Producto:</strong> {product.productId.name} - 
                            <strong> Cantidad:</strong> {product.quantity} - 
                            <strong> Precio:</strong> ${product.price}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default InvoiceModal;
