import React, { createContext, useState, useEffect } from 'react';
import { getUserProfile } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const authenticateUser = async (response) => {
        const token = response.token;
        if (token) {
            localStorage.setItem('token', token);
            try {
                const profile = await getUserProfile();
                setUser(profile);
            } catch (error) {
                console.error("Error al obtener el perfil del usuario:", error);
            }
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getUserProfile()
                .then(profile => setUser(profile))
                .catch(error => {
                    console.error("Error al cargar el perfil:", error);
                    localStorage.removeItem('token');
                });
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, authenticateUser, logout, loading }}>
            {!loading && children} {/* Solo renderiza cuando loading es false */}
        </AuthContext.Provider>
    );
};
