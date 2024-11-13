// src/pages/ManageInvoices.js
import React, { useState, useEffect } from 'react';
import { fetchSuppliers } from '../services/supplierService';
import { fetchProducts } from '../services/productService';
import { fetchInvoices, createInvoice, fetchInvoiceById } from '../services/invoiceService';
import InvoiceModal from '../components/Invoice/InvoiceModal';
import '../styles/ManageInvoices.css';

const ManageInvoices = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [invoiceProducts, setInvoiceProducts] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [invoices, setInvoices] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const loadSuppliersAndProducts = async () => {
            const suppliersData = await fetchSuppliers();
            const productsData = await fetchProducts();
            setSuppliers(suppliersData);
            setProducts(productsData);
        };

        const loadInvoices = async () => {
            const invoicesData = await fetchInvoices();
            setInvoices(invoicesData);
        };

        loadSuppliersAndProducts();
        loadInvoices();
    }, []);

    const addProductToInvoice = () => {
        setInvoiceProducts([...invoiceProducts, { productId: '', quantity: 1, price: 0 }]);
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
            {invoiceProducts.map((product, index) => (
                <div key={index} className="invoice-item">
                    <select
                        value={product.productId}
                        onChange={(e) => handleProductChange(index, 'productId', e.target.value)}
                    >
                        <option value="">Seleccione un producto</option>
                        {products.map(p => (
                            <option key={p._id} value={p._id}>{p.name}</option>
                        ))}
                    </select>
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
            <button className="button" onClick={addProductToInvoice}>Añadir Producto</button>

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
