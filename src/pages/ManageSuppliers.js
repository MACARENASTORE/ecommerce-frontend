// src/pages/ManageSuppliers.js
import React from 'react';

const ManageSuppliers = () => {
    return (
        <div>
            <h1>Gestionar Proveedores</h1>
            <p>Aquí puedes agregar, editar o eliminar proveedores.</p>
            {/* Aquí podrías incluir un formulario para agregar un nuevo proveedor o una lista de proveedores */}
            <button>Añadir Proveedor</button>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Aquí irían los proveedores listados */}
                    <tr>
                        <td>Proveedor 1</td>
                        <td>Dirección 1</td>
                        <td>123456789</td>
                        <td>
                            <button>Editar</button>
                            <button>Eliminar</button>
                        </td>
                    </tr>
                    {/* Más proveedores */}
                </tbody>
            </table>
        </div>
    );
};

export default ManageSuppliers;
