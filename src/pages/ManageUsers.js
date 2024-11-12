// src/pages/ManageUsers.js
import React, { useEffect, useState } from 'react';
import { getAllUsers, updateUser, deleteUser } from '../services/authService.js';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const usersData = await getAllUsers();
            setUsers(usersData);
        };
        fetchUsers();
    }, []);

    const handleDeleteUser = async (id) => {
        await deleteUser(id);
        setUsers(users.filter(user => user._id !== id));
    };

    const handleEditUser = (user) => {
        setEditUser(user);
    };

    const handleSaveUser = async () => {
        await updateUser(editUser._id, editUser);
        setUsers(users.map(user => user._id === editUser._id ? editUser : user));
        setEditUser(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditUser(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <div>
            <h1>Gestionar Usuarios</h1>
            {editUser ? (
                <div>
                    <h2>Editar Usuario</h2>
                    <input
                        type="text"
                        name="username"
                        value={editUser.username}
                        onChange={handleChange}
                        placeholder="Nombre"
                    />
                    <input
                        type="text"
                        name="email"
                        value={editUser.email}
                        onChange={handleChange}
                        placeholder="Correo"
                    />
                    <select name="role" value={editUser.role} onChange={handleChange}>
                        <option value="user">Usuario</option>
                        <option value="admin">Administrador</option>
                    </select>
                    <button onClick={handleSaveUser}>Guardar</button>
                    <button onClick={() => setEditUser(null)}>Cancelar</button>
                </div>
            ) : (
                <>
                    <button onClick={() => setEditUser({ username: '', email: '', role: 'user' })}>
                        Añadir Usuario
                    </button>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button onClick={() => handleEditUser(user)}>Editar</button>
                                        <button onClick={() => handleDeleteUser(user._id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default ManageUsers;
