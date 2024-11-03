// src/components/Order/OrderList.js
import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../../services/orderService';

const OrderList = () => {
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
        <div>
            <h2>Lista de Órdenes</h2>
            <ul>
                {orders.map(order => (
                    <li key={order._id}>
                        Orden N°: {order._id} - Total: ${order.totalAmount.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderList;
