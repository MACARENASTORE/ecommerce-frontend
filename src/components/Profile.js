import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
    const { logout } = useContext(AuthContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3009/api/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            }
        };

        fetchUserData();
    }, []);

    if (!user) return <p>Cargando datos del usuario...</p>;

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto', textAlign: 'center' }}>
            <h2>Perfil de Usuario</h2>
            <div style={{ margin: '20px 0' }}>
                <p><strong>Nombre:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
            <button onClick={logout} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>
                Cerrar Sesión
            </button>
        </div>
    );
};

export default Profile;
