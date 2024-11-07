// src/pages/ManageUsers.js
import React from 'react';

const ManageUsers = () => {
    return (
        <div>
            <h1>Gestionar Usuarios</h1>
            <p>Aquí puedes ver, crear, editar o eliminar usuarios.</p>
            <button>Añadir Usuario</button>
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
                    {/* Aquí irían los usuarios listados */}
                    <tr>
                        <td>Juan Pérez</td>
                        <td>juan@email.com</td>
                        <td>Admin</td>
                        <td>
                            <button>Editar</button>
                            <button>Eliminar</button>
                        </td>
                    </tr>
                    {/* Más usuarios */}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;
