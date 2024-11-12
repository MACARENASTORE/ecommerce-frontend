// src/pages/Categories.js
import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../services/categoryService';
import { Link } from 'react-router-dom';
import '../styles/Categories.css';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            const data = await fetchCategories();
            setCategories(data);
        };
        loadCategories();
    }, []);

    return (
        <div className="categories">
            <h1>Categorías</h1>
            <ul>
                {categories.map((category) => (
                    <li key={category._id}>
                        <Link to={`/products?category=${category._id}`}>{category.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
