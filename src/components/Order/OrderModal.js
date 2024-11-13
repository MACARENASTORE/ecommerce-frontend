// src/components/Order/OrderModal.js
import React from 'react';
import '../../styles/OrderModal.css';

const OrderModal = ({ order, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Detalles de la Orden</h2>
                <p><strong>Orden ID:</strong> {order._id}</p>
                <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
                <p><strong>Estado:</strong> {order.status}</p>
                <p><strong>Fecha:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                <h3>Dirección de Envío</h3>
                <p>{order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.country}</p>
                <h3>Método de Pago</h3>
                <p>{order.paymentMethod}</p>
                <h3>Productos</h3>
                <ul>
                    {order.products.map((item) => (
                        <li key={item.productId._id}>
                            {item.productId.name} - Cantidad: {item.quantity} - Precio: ${item.price}
                        </li>
                    ))}
                </ul>
                <button onClick={onClose} className="close-button">Cerrar</button>
            </div>
        </div>
    );
};

export default OrderModal;
