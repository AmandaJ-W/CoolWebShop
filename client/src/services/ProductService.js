import axios from 'axios';

// const http = axios.create({
//     baseURL: "http://localhost:9000"
//   });

export default {
    getProducts() {
        return axios.get('/products');
    },
    getProductById(productId) {
        return axios.get(`/products/${productId}`);

    },
    getProductsByName(searchTerm) {
        return axios.get(`/products?name=${searchTerm}`)
    }
}
