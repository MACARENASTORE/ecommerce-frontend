// src/pages/Products.js
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/productService';
import { addToCart } from '../services/cartService';
import '../styles/ProductList.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };
        getProducts();
    }, []);

    const handleAddToCart = async (productId, quantity) => {
        try {
            await addToCart({ productId, quantity }); // Cambia para enviar como objeto
            alert('Producto agregado al carrito');
        } catch (error) {
            alert('No se pudo agregar el producto al carrito. Inténtalo de nuevo.');
            console.error("Error en handleAddToCart:", error);
        }
    };
    

    const handleQuantityChange = (productId, value) => {
        setQuantities({ ...quantities, [productId]: Math.max(1, value) });
    };

    return (
        <div className="products-container">
            <h2>Productos</h2>
            <div className="product-list">
                {products.map(product => (
                    <div key={product._id} className="product-card">
                        <img src={product.image[0]} alt={product.name} className="product-image" />
                        <h3>{product.name}</h3>
                        <p>Precio: ${product.price}</p>
                        <p>Descuento: {product.discount}%</p>
                        <p>Estado: {product.status}</p>
                        <p>Stock disponible: {product.stock}</p>
                        <input
                            type="number"
                            min="1"
                            max={product.stock}
                            value={quantities[product._id] || 1}
                            onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value))}
                        />
                        <button 
                            onClick={() => handleAddToCart(product._id, quantities[product._id] || 1)}
                            disabled={(quantities[product._id] || 1) > product.stock}
                        >
                            Agregar al carrito
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
