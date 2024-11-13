import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../services/orderService';
import '../styles/Orders.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);

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

    return (
        <div className="orders-container">
            <h2>Lista de Órdenes</h2>
            <ul>
                {orders.map(order => (
                    <li key={order._id} className="order-item">
                        Orden N°: {order._id} - Total: ${order.totalAmount.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Orders;
