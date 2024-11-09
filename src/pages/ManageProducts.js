// src/pages/ManageProducts.js
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../services/productService';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../services/categoryService';

const ManageProducts = () => {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', stock: '', category: '', image: null });
    const [isEditingProduct, setIsEditingProduct] = useState(false);
    const [isEditingCategory, setIsEditingCategory] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);
    const [currentCategoryId, setCurrentCategoryId] = useState(null);

    // Cargar productos y categorías
    useEffect(() => {
        const loadProductsAndCategories = async () => {
            const productsData = await fetchProducts();
            const categoriesData = await fetchCategories();
            setProducts(productsData);
            setCategories(categoriesData);
        };
        loadProductsAndCategories();
    }, []);

    // Crear o actualizar categoría
    const handleCategorySubmit = async () => {
        if (isEditingCategory) {
            await updateCategory(currentCategoryId, newCategory);
            setCategories(categories.map(cat => cat._id === currentCategoryId ? { ...cat, ...newCategory } : cat));
        } else {
            const createdCategory = await createCategory(newCategory);
            setCategories([...categories, createdCategory]);
        }
        setNewCategory({ name: '', description: '' });
        setIsEditingCategory(false);
        setCurrentCategoryId(null);
    };

    // Crear o actualizar producto
    const handleProductSubmit = async () => {
        const formData = new FormData();
        formData.append('name', newProduct.name);
        formData.append('description', newProduct.description);
        formData.append('price', newProduct.price);
        formData.append('stock', newProduct.stock);
        formData.append('category', newProduct.category);
        if (newProduct.image) formData.append('image', newProduct.image);
    
        if (isEditingProduct) {
            await updateProduct(currentProductId, formData);
            setProducts(products.map(prod => prod._id === currentProductId ? { ...prod, ...newProduct } : prod));
        } else {
            const createdProduct = await createProduct(formData);
            setProducts([...products, createdProduct]);
        }
    
        setNewProduct({ name: '', description: '', price: '', stock: '', category: '', image: null });
        setIsEditingProduct(false);
        setCurrentProductId(null);
    };

    // Configurar formulario para editar categoría
    const handleEditCategory = (category) => {
        setNewCategory({ name: category.name, description: category.description });
        setIsEditingCategory(true);
        setCurrentCategoryId(category._id);
    };

    // Configurar formulario para editar producto
    const handleEditProduct = (product) => {
        setNewProduct({ ...product, category: product.category?._id });
        setIsEditingProduct(true);
        setCurrentProductId(product._id);
    };

    // Eliminar categoría
    const handleDeleteCategory = async (id) => {
        await deleteCategory(id);
        setCategories(categories.filter(cat => cat._id !== id));
    };

    // Eliminar producto
    const handleDeleteProduct = async (id) => {
        await deleteProduct(id);
        setProducts(products.filter(prod => prod._id !== id));
    };

    return (
        <div>
            <h1>Gestión de Productos y Categorías</h1>
            
            {/* Formulario para crear/editar categoría */}
            {user?.role === 'admin' && (
                <div>
                    <h2>{isEditingCategory ? 'Editar' : 'Crear'} Categoría</h2>
                    <input
                        type="text"
                        placeholder="Nombre de la categoría"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Descripción"
                        value={newCategory.description}
                        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    />
                    <button onClick={handleCategorySubmit}>{isEditingCategory ? 'Actualizar' : 'Crear'} Categoría</button>
                </div>
            )}

            {/* Formulario para crear/editar producto */}
            {user?.role === 'admin' && (
                <div>
                    <h2>{isEditingProduct ? 'Editar' : 'Crear'} Producto</h2>
                    <input
                        type="text"
                        placeholder="Nombre del producto"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Descripción"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Precio"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                    />
                    <input
                        type="number"
                        placeholder="Stock"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value, 10) })}
                    />
                    <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    >
                        <option value="">Seleccionar categoría</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="file"
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
                    />
                    <button onClick={handleProductSubmit}>{isEditingProduct ? 'Actualizar' : 'Crear'} Producto</button>
                </div>
            )}

            {/* Lista de productos */}
            <h2>Lista de Productos</h2>
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        {product.name} - ${product.price} - {product.category?.name || 'Sin Categoría'}
                        {user?.role === 'admin' && (
                            <>
                                <button onClick={() => handleEditProduct(product)}>Editar</button>
                                <button onClick={() => handleDeleteProduct(product._id)}>Eliminar</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageProducts;
