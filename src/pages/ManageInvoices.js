// src/pages/ManageInvoices.js
import React from 'react';

const ManageInvoices = () => {
    return (
        <div>
            <h1>Gestionar Facturas</h1>
            <p>Aquí puedes ver, crear o eliminar facturas y gestionar el stock.</p>
            <button>Añadir Factura</button>
            <table>
                <thead>
                    <tr>
                        <th>Proveedor</th>
                        <th>Fecha</th>
                        <th>Monto</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Aquí irían las facturas listadas */}
                    <tr>
                        <td>Proveedor 1</td>
                        <td>2024-11-01</td>
                        <td>$500</td>
                        <td>Pendiente</td>
                        <td>
                            <button>Ver</button>
                            <button>Eliminar</button>
                        </td>
                    </tr>
                    {/* Más facturas */}
                </tbody>
            </table>
        </div>
    );
};

export default ManageInvoices;
