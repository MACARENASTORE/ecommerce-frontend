// src/pages/ProductManager.js
import React, { useEffect, useState } from 'react';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../services/productService';
import { fetchCategories, createCategory } from '../services/categoryService';
import '../styles/ManageProducts.css';

const ProductManager = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });
    const [newProduct, setNewProduct] = useState({
        name: '', description: '', price: '', stock: '', category: '', image: null, isFeatured: false, ean: ''
    });
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const productsData = await fetchProducts();
                const categoriesData = await fetchCategories();
                setProducts(productsData);
                setCategories(categoriesData);
            } catch (error) {
                console.error("Error al cargar datos:", error);
            }
        };
        loadData();
    }, []);

    // Agregar nueva categoría
    const handleCategorySubmit = async () => {
        try {
            const createdCategory = await createCategory(newCategory);
            setCategories([...categories, createdCategory]);
            setNewCategory({ name: '', description: '' });
        } catch (error) {
            console.error("Error al crear categoría:", error);
        }
    };

    // Agregar o editar producto
    const handleProductSubmit = async () => {
        const formData = new FormData();
        formData.append('name', newProduct.name);
        formData.append('description', newProduct.description);
        formData.append('price', parseFloat(newProduct.price));
        formData.append('stock', parseInt(newProduct.stock, 10));
        formData.append('category', newProduct.category);
        formData.append('ean', newProduct.ean);
        formData.append('isFeatured', newProduct.isFeatured);
        if (newProduct.image) formData.append('image', newProduct.image);

        try {
            if (editingProduct) {
                const updatedProduct = await updateProduct(editingProduct._id, formData);
                setProducts(products.map(prod => prod._id === editingProduct._id ? updatedProduct : prod));
                setEditingProduct(null);
            } else {
                const createdProduct = await createProduct(formData);
                setProducts([...products, createdProduct]);
            }
            setNewProduct({ name: '', description: '', price: '', stock: '', category: '', image: null, isFeatured: false, ean: '' });
        } catch (error) {
            console.error("Error al crear o actualizar el producto:", error);
        }
    };

    const handleEditProduct = (product) => {
        setNewProduct({ ...product, category: product.category?._id });
        setEditingProduct(product);
    };

    const handleDeleteProduct = async (id) => {
        try {
            await deleteProduct(id);
            setProducts(products.filter(prod => prod._id !== id));
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    };

    return (
        <div className="product-manager-container">
            <h1>Gestión de Productos</h1>

            <div className="form-section">
                <h2>Agregar Categoría</h2>
                <input
                    type="text"
                    placeholder="Nombre de la categoría"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Descripción de la categoría"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                />
                <button onClick={handleCategorySubmit}>Crear Categoría</button>
            </div>

            <div className="form-section">
                <h2>{editingProduct ? 'Editar Producto' : 'Agregar Producto'}</h2>
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
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                />
                <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                >
                    <option value="">Seleccionar categoría</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>
                <input
                    type="file"
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
                />
                <input
                    type="text"
                    placeholder="EAN"
                    value={newProduct.ean}
                    onChange={(e) => setNewProduct({ ...newProduct, ean: e.target.value })}
                />
                <label>
                    <input
                        type="checkbox"
                        checked={newProduct.isFeatured}
                        onChange={(e) => setNewProduct({ ...newProduct, isFeatured: e.target.checked })}
                    />
                    Destacado
                </label>
                <button onClick={handleProductSubmit}>{editingProduct ? 'Actualizar Producto' : 'Crear Producto'}</button>
            </div>

            <h2>Lista de Productos</h2>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Categoría</th>
                        <th>Destacado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.image && product.image[0] ? <img src={product.image[0]} alt={product.name} className="product-thumbnail" /> : 'Sin imagen'}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.stock}</td>
                            <td>{product.category?.name || 'Sin Categoría'}</td>
                            <td>{product.isFeatured ? 'Sí' : 'No'}</td>
                            <td>
                                <button onClick={() => handleEditProduct(product)}>Editar</button>
                                <button onClick={() => handleDeleteProduct(product._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductManager;
