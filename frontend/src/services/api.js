//all api calls in just one place
import axios from 'axios';

const api = axios.create({
    baseURL : 'http://localhost:5000/api',
});

//get api calls
export const getProducts = (params ={}) => api.get('/products',{ params });

//get low stock products
export const getLowStockProducts = () => api.get('/products/low-stock');

//add a new product
export const createProduct = (data) =>api.post('/products',data);

//update an existing product
export const updateProduct = (id,data) => api.put(`/products/${id}`,data);

//delete a product 
export const deleteProduct = (id)=> api.delete(`/products/${id}`);





