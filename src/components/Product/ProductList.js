// src/components/Product/ProductList.js
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../services/productService';
import { addToCart } from '../../services/cartService';
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            const data = await fetchProducts();
            setProducts(data);
        };
        loadProducts();
    }, []);

    const handleAddToCart = async (productId) => {
        await addToCart(productId);
        alert('Producto agregado al carrito');
    };

    return (
        <div className="product-list">
            {products.map(product => (
                <div key={product._id} className="product-card">
                    <img src={product.image[0]} alt={product.name} className="product-image" />
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>Precio: ${product.price}</p>
                    <button onClick={() => handleAddToCart(product._id)}>Agregar al carrito</button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
