// src/components/Admin/ManageProducts.js
import React, { useEffect, useState } from 'react';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../../services/productService';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });

    useEffect(() => {
        const loadProducts = async () => {
            const result = await fetchProducts();
            setProducts(result);
        };
        loadProducts();
    }, []);

    const handleCreate = async () => {
        const result = await createProduct(newProduct);
        setProducts([...products, result]);
        setNewProduct({ name: '', price: '', description: '' });
    };

    const handleUpdate = async (id) => {
        const updatedProduct = await updateProduct(id, newProduct);
        setProducts(products.map(p => p._id === id ? updatedProduct : p));
    };

    const handleDelete = async (id) => {
        await deleteProduct(id);
        setProducts(products.filter(p => p._id !== id));
    };

    return (
        <div>
            <h2>Gestionar Productos</h2>
            <input
                type="text"
                placeholder="Nombre"
                value={newProduct.name}
                onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
                type="number"
                placeholder="Precio"
                value={newProduct.price}
                onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <input
                type="text"
                placeholder="Descripción"
                value={newProduct.description}
                onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
            />
            <button onClick={handleCreate}>Crear Producto</button>
            <ul>
                {products.map(product => (
                    <li key={product._id}>
                        {product.name} - ${product.price}
                        <button onClick={() => handleUpdate(product._id)}>Actualizar</button>
                        <button onClick={() => handleDelete(product._id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageProducts;

