import axios from 'axios';


export default {
    getCart() {
        return axios.get('/cart');
    },
    addToCart(product) {
        return axios.post('/cart/items', product);
    },
    getCartItemById(cartItemId) {
        return axios.get(`/cart/items/${cartItemId}`, )
    },
    removeItem(cartItemId) {
        return axios.delete(`/cart/items/${cartItemId}`);
    },
    clearCart() {
        return axios.delete('/cart');
    }
}
