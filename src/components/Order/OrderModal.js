// src/components/Order/OrderModal.js
import React from 'react';
import '../../styles/OrderModal.css';

const OrderModal = ({ order, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h3>Detalles de la Orden</h3>
                <p><strong>Orden ID:</strong> {order._id}</p>
                <p><strong>Fecha:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                <p><strong>Estado:</strong> {order.status}</p>
                <p><strong>Método de Pago:</strong> {order.paymentMethod}</p>

                <h4>Dirección de Envío</h4>
                <p>{order.shippingAddress.street}, {order.shippingAddress.city}</p>
                <p>{order.shippingAddress.state}, {order.shippingAddress.country} - {order.shippingAddress.postalCode}</p>

                <h4>Productos en la Orden</h4>
                <ul>
                    {order.products.map((item) => (
                        <li key={item.productId._id}>
                            <p><strong>Producto:</strong> {item.productId.name}</p>
                            <p><strong>Cantidad:</strong> {item.quantity}</p>
                            <p><strong>Precio:</strong> ${item.price.toFixed(2)}</p>
                        </li>
                    ))}
                </ul>

                {order.invoiceUrl && (
                    <a href={order.invoiceUrl} target="_blank" rel="noopener noreferrer" className="download-link">
                        Descargar Factura
                    </a>
                )}
            </div>
        </div>
    );
};

export default OrderModal;
