// src/pages/AdminOrderList.js
import React, { useEffect, useState } from 'react';
import { fetchAllOrders, updateOrderStatus } from '../services/orderService';
import '../styles/AdminOrderList.css';

const AdminOrderList = () => {
    const [orders, setOrders] = useState([]);

    // Cargar todas las órdenes al montar el componente
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

    // Función para ver los detalles de una orden específica
    const viewOrderDetails = (order) => {
        alert(`Detalles de la orden:\nCliente: ${order.userId.username}\nTotal: $${order.totalAmount}\nEstado: ${order.status}`);
    };

    // Función para descargar la factura de una orden específica
    const downloadInvoice = (url) => {
        window.open(url, '_blank');
    };

    // Función para actualizar el estado de la orden
    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            setOrders(orders.map(order => order._id === orderId ? { ...order, status: newStatus } : order));
        } catch (error) {
            console.error('Error al actualizar el estado de la orden:', error);
        }
    };

    return (
        <div className="admin-order-list">
            <h2>Gestor de Órdenes</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID de Orden</th>
                        <th>Cliente</th>
                        <th>Estado</th>
                        <th>Total</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.userId.username}</td>
                            <td>
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                >
                                    <option value="pending">Pendiente</option>
                                    <option value="completed">Completada</option>
                                    <option value="cancelled">Cancelada</option>
                                </select>
                            </td>
                            <td>${order.totalAmount.toFixed(2)}</td>
                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => viewOrderDetails(order)}>Ver Detalles</button>
                                <button onClick={() => downloadInvoice(order.invoiceUrl)}>Descargar Factura</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminOrderList;
