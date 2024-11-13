// src/pages/Orders.js
import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../services/orderService';
import OrderModal from '../components/Order/OrderModal';
import '../styles/Orders.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const data = await fetchOrders();
                setOrders(data);
            } catch (error) {
                console.error("Error al cargar órdenes:", error);
            }
        };
        loadOrders();
    }, []);

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    return (
        <div className="orders-container">
            <h2>Lista de Órdenes</h2>
            <ul className="orders-list">
                {orders.map(order => (
                    <li key={order._id} className="order-item">
                        <div className="order-info">
                            <p><strong>Orden N°:</strong> {order._id}</p>
                            <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
                        </div>
                        <button className="view-button" onClick={() => handleViewOrder(order)}>
                            Ver Detalles
                        </button>
                        {order.invoiceUrl && (
                            <button className="download-button" onClick={() => window.open(order.invoiceUrl, '_blank')}>
                                Descargar Factura
                            </button>
                        )}
                    </li>
                ))}
            </ul>
            {isModalOpen && selectedOrder && (
                <OrderModal order={selectedOrder} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default Orders;
