// src/context/ProductContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getAllProducts, createProduct } from '../services/productService';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const result = await getAllProducts();
            setProducts(result);
        };
        fetchProducts();
    }, []);

    const addProduct = async (productData) => {
        const newProduct = await createProduct(productData);
        setProducts((prevProducts) => [...prevProducts, newProduct]);
    };

    return (
        <ProductContext.Provider value={{ products, addProduct }}>
            {children}
        </ProductContext.Provider>
    );
};
