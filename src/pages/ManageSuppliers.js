import React, { useEffect, useState } from 'react';
import { fetchSuppliers, createSupplier } from '../services/supplierService';

const ManageSuppliers = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [newSupplier, setNewSupplier] = useState({ name: '', nit: '', contactName: '', contactPhone: '', address: '' });

    // Cargar proveedores al montar el componente
    useEffect(() => {
        const loadSuppliers = async () => {
            try {
                const data = await fetchSuppliers();
                setSuppliers(data);
            } catch (error) {
                console.error("Error al cargar proveedores:", error);
            }
        };
        loadSuppliers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSupplier((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleCreateSupplier = async () => {
        try {
            const createdSupplier = await createSupplier(newSupplier);
            setSuppliers([...suppliers, createdSupplier]);
            setNewSupplier({ name: '', nit: '', contactName: '', contactPhone: '', address: '' });
        } catch (error) {
            console.error("Error al crear proveedor:", error);
        }
    };

    return (
        <div>
            <h1>Gestionar Proveedores</h1>
            <div>
                <h2>Añadir Proveedor</h2>
                <input type="text" name="name" placeholder="Nombre" value={newSupplier.name} onChange={handleInputChange} />
                <input type="text" name="nit" placeholder="NIT" value={newSupplier.nit} onChange={handleInputChange} />
                <input type="text" name="contactName" placeholder="Nombre de contacto" value={newSupplier.contactName} onChange={handleInputChange} />
                <input type="text" name="contactPhone" placeholder="Teléfono de contacto" value={newSupplier.contactPhone} onChange={handleInputChange} />
                <input type="text" name="address" placeholder="Dirección" value={newSupplier.address} onChange={handleInputChange} />
                <button onClick={handleCreateSupplier}>Añadir Proveedor</button>
            </div>

            <h2>Lista de Proveedores</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>NIT</th>
                        <th>Contacto</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map((supplier) => (
                        <tr key={supplier._id}>
                            <td>{supplier.name}</td>
                            <td>{supplier.nit}</td>
                            <td>{supplier.contactName}</td>
                            <td>{supplier.contactPhone}</td>
                            <td>{supplier.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageSuppliers;
