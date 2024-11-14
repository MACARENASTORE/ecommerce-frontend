// src/pages/ManageInvoices.js
import React, { useState, useEffect } from 'react';
import { fetchSuppliers } from '../services/supplierService';
import { searchProducts } from '../services/productService'; // Cambia a usar la función de búsqueda
import { fetchInvoices, createInvoice, fetchInvoiceById } from '../services/invoiceService';
import InvoiceModal from '../components/Invoice/InvoiceModal';
import '../styles/ManageInvoices.css';

const ManageInvoices = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [invoiceProducts, setInvoiceProducts] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [invoices, setInvoices] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState(''); // Para almacenar la búsqueda de productos
    const [searchResults, setSearchResults] = useState([]); // Para almacenar los resultados de búsqueda

    useEffect(() => {
        const loadSuppliersAndInvoices = async () => {
            const suppliersData = await fetchSuppliers();
            const invoicesData = await fetchInvoices();
            setSuppliers(suppliersData);
            setInvoices(invoicesData);
        };
        loadSuppliersAndInvoices();
    }, []);

    const handleSearch = async () => {
        if (searchQuery.trim()) {
            try {
                const results = await searchProducts(searchQuery);
                setSearchResults(results);
            } catch (error) {
                console.error("Error al buscar productos:", error);
            }
        } else {
            setSearchResults([]);
        }
    };

    const addProductToInvoice = (product) => {
        setInvoiceProducts([...invoiceProducts, { productId: product._id, name: product.name, quantity: 1, price: product.price }]);
        setSearchResults([]); // Limpiar resultados después de agregar
        setSearchQuery(''); // Limpiar campo de búsqueda
    };

    const handleProductChange = (index, field, value) => {
        const newInvoiceProducts = [...invoiceProducts];
        newInvoiceProducts[index][field] = value;
        setInvoiceProducts(newInvoiceProducts);
        calculateTotal(newInvoiceProducts);
    };

    const calculateTotal = (products) => {
        const total = products.reduce((acc, item) => acc + item.quantity * item.price, 0);
        setTotalAmount(total);
    };

    const handleCreateInvoice = async () => {
        const newInvoice = {
            supplierId: selectedSupplier,
            products: invoiceProducts.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
            })),
            totalAmount,
            invoiceNumber,
        };
        await createInvoice(newInvoice);
        setSelectedSupplier('');
        setInvoiceProducts([]);
        setTotalAmount(0);
        setInvoiceNumber('');
    };

    const handleOpenInvoice = async (invoiceId) => {
        const invoiceData = await fetchInvoiceById(invoiceId);
        setSelectedInvoice(invoiceData);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedInvoice(null);
    };

    return (
        <div className="invoices-container">
            <h1>Gestionar Facturas</h1>

            <div className="select-container">
                <label>Seleccionar Proveedor:</label>
                <select value={selectedSupplier} onChange={(e) => setSelectedSupplier(e.target.value)}>
                    <option value="">Seleccione un proveedor</option>
                    {suppliers.map(supplier => (
                        <option key={supplier._id} value={supplier._id}>{supplier.name}</option>
                    ))}
                </select>
            </div>

            <div className="select-container">
                <label>Número de Factura (opcional):</label>
                <input
                    type="text"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                />
            </div>

            <h2>Productos en la Factura</h2>
            
            {/* Buscador de productos */}
            <div className="product-search">
                <input
                    type="text"
                    placeholder="Buscar producto por nombre"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Buscar</button>
            </div>
            
            {/* Resultados de búsqueda */}
            {searchResults.length > 0 && (
                <div className="search-results">
                    {searchResults.map((product) => (
                        <div key={product._id} className="search-result-item">
                            <span>{product.name} - ${product.price}</span>
                            <button onClick={() => addProductToInvoice(product)}>Agregar</button>
                        </div>
                    ))}
                </div>
            )}

            {invoiceProducts.map((product, index) => (
                <div key={index} className="invoice-item">
                    <span>{product.name}</span>
                    <input
                        type="number"
                        placeholder="Cantidad"
                        value={product.quantity}
                        onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value, 10))}
                    />
                    <input
                        type="number"
                        placeholder="Precio"
                        value={product.price}
                        onChange={(e) => handleProductChange(index, 'price', parseFloat(e.target.value))}
                    />
                </div>
            ))}
            
            <h3 className="total-amount">Total: ${totalAmount}</h3>
            <button className="button" onClick={handleCreateInvoice}>Crear Factura</button>

            <h2>Facturas Creadas</h2>
            <ul className="invoices-list">
                {invoices.map(invoice => (
                    <li key={invoice._id} className="invoice-item">
                        <strong>Número de Factura:</strong> {invoice.invoiceNumber}, 
                        <strong> Proveedor:</strong> {invoice.supplierId.name}, 
                        <strong> Total:</strong> ${invoice.totalAmount}
                        <button className="button" onClick={() => handleOpenInvoice(invoice._id)}>Ver Detalles</button>
                    </li>
                ))}
            </ul>

            {isModalOpen && selectedInvoice && (
                <InvoiceModal
                    invoice={selectedInvoice}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default ManageInvoices;
