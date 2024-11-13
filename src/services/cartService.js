import api from './axiosConfig';

/**
 * Obtiene el carrito actual del usuario.
 * @returns {Promise<Object>} El carrito actual del usuario.
 */
export const getCart = async () => {
    try {
        const response = await api.get('/cart');
        return response.data;
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        throw error;
    }
};

/**
 * Agrega un producto al carrito.
 * @param {Object} product - Información del producto.
 * @returns {Promise<Object>} El carrito actualizado.
 */
export const addToCart = async (product) => {
    try {
        const response = await api.post('/cart', product);
        return response.data;
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
        throw error;
    }
};

/**
 * Actualiza la cantidad de un producto en el carrito.
 * @param {string} productId - ID del producto.
 * @param {number} quantity - Nueva cantidad.
 * @returns {Promise<Object>} El carrito actualizado.
 */
export const updateCartItem = async (productId, quantity) => {
    try {
        const response = await api.put(`/cart/${productId}`, { quantity });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar producto en el carrito:', error);
        throw error;
    }
};

/**
 * Elimina un producto del carrito.
 * @param {string} productId - ID del producto a eliminar.
 * @returns {Promise<Object>} El carrito actualizado.
 */
export const removeCartItem = async (productId) => {
    try {
        const response = await api.delete(`/cart/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar producto del carrito:', error);
        throw error;
    }
};
