// src/pages/Profile.js
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import OrderModal from '../components/Order/OrderModal';
import '../styles/Profile.css';

const Profile = () => {
    const { logout } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [updatedData, setUpdatedData] = useState({});
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetchUserData();
        fetchUserOrders();
    }, []);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3009/api/auth/profile', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response.data);
            setUpdatedData(response.data);
        } catch (error) {
            console.error('Error al obtener los datos del usuario:', error);
        }
    };

    const fetchUserOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3009/api/orders', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOrders(response.data);
        } catch (error) {
            console.error('Error al obtener las órdenes del usuario:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData({ ...updatedData, [name]: value });
    };

    const handleEditToggle = () => {
        setEditMode(!editMode);
    };

    const handleSaveChanges = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:3009/api/auth/profile', updatedData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(updatedData);
            setEditMode(false);
            alert('Perfil actualizado con éxito');
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
            alert('Error al actualizar el perfil');
        }
    };

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
    };

    const handleCloseOrderModal = () => {
        setSelectedOrder(null);
    };

    if (!user) return <p>Cargando datos del usuario...</p>;

    return (
        <div className="profile-container">
            <h2>Perfil de Usuario</h2>
            <div className="profile-info">
                {editMode ? (
                    <>
                        <input
                            type="text"
                            name="username"
                            value={updatedData.username}
                            onChange={handleInputChange}
                            placeholder="Nombre de usuario"
                        />
                        <input
                            type="email"
                            name="email"
                            value={updatedData.email}
                            onChange={handleInputChange}
                            placeholder="Correo electrónico"
                        />
                        <input
                            type="text"
                            name="address"
                            value={updatedData.address || ''}
                            onChange={handleInputChange}
                            placeholder="Dirección"
                        />
                        <button onClick={handleSaveChanges}>Guardar Cambios</button>
                    </>
                ) : (
                    <>
                        <p><strong>Nombre:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Dirección:</strong> {user.address || 'No especificada'}</p>
                        <button onClick={handleEditToggle}>Editar Perfil</button>
                    </>
                )}
            </div>

            <button onClick={logout} className="logout-button">
                Cerrar Sesión
            </button>

            <h3>Órdenes Realizadas</h3>
            <div className="orders-list">
                {orders.length === 0 ? (
                    <p>No se han realizado pedidos.</p>
                ) : (
                    <ul>
                        {orders.map(order => (
                            <li key={order._id} className="order-item">
                                <p><strong>Orden ID:</strong> {order._id}</p>
                                <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
                                <p><strong>Estado:</strong> {order.status}</p>
                                <button onClick={() => handleViewOrder(order)} className="view-order-button">
                                    Ver Detalles
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {selectedOrder && (
                <OrderModal order={selectedOrder} onClose={handleCloseOrderModal} />
            )}
        </div>
    );
};

export default Profile;
