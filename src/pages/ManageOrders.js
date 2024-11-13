// src/pages/ManageOrders.js
import React, { useEffect, useState } from 'react';
import { fetchAllOrders, updateOrderStatus } from '../services/orderService';
import '../styles/ManageOrders.css';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const data = await fetchAllOrders();
                setOrders(data);
            } catch (error) {
                console.error('Error al cargar órdenes:', error);
            }
        };
        loadOrders();
    }, []);

    const handleStatusChange = async (orderId, status) => {
        try {
            await updateOrderStatus(orderId, status);
            setOrders(orders.map(order =>
                order._id === orderId ? { ...order, status } : order
            ));
            alert('Estado de la orden actualizado');
        } catch (error) {
            console.error('Error al actualizar el estado de la orden:', error);
        }
    };

    return (
        <div className="manage-orders">
            <h2>Gestión de Órdenes</h2>
            <ul>
                {orders.map(order => (
                    <li key={order._id} className="order-item">
                        <p><strong>Orden ID:</strong> {order._id}</p>
                        <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
                        <p><strong>Estado actual:</strong> {order.status}</p>
                        <div>
                            <label>Actualizar Estado:</label>
                            <select onChange={(e) => handleStatusChange(order._id, e.target.value)} value={order.status}>
                                <option value="pending">Pendiente</option>
                                <option value="shipped">Enviado</option>
                                <option value="delivered">Entregado</option>
                                <option value="cancelled">Cancelado</option>
                            </select>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageOrders;
