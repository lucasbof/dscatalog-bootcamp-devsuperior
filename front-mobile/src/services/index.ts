import axios from 'axios';
import { Product } from '../types';
import { getToken } from './auth';

export const api = axios.create({
    baseURL: 'http://192.168.15.8:8080'
});

export const CLIENT_ID = 'dscatalog';
export const CLIENT_SECRET = 'dscatalog123';

export const getProducts = () => {
    const res = api.get('/products?direction=DESC&orderBy=id');
    return res;
}

export const getCategories = () => {
    const res = api.get('/categories?direction=ASC&orderBy=name');
    return res;
}

export const getProduct = (id: number) => {
    const res = api.get(`/products/${id}`);
    return res;
}

export const insertNewProduct = async (product: Product) => {

    const token = await getToken();
    if(!token) throw new Error('Token inválido!')

    const res = api.post('/products', product, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res;
}

export const updateProduct = async (product: Product) => {

    const token = await getToken();
    if(!token) throw new Error('Token inválido!')

    const res = api.put(`/products/${product.id}`, product, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res;
}

export const deleteProduct = async (id : number) => {

    const token = await getToken();
    if(!token) throw new Error('Token inválido!')

    const res = api.delete(`/products/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return res;
}

export const uploadImage = async (image: string) => {
    if(!image) return;
    const token = await getToken();
    let data = new FormData();
    data.append('file', {
        uri: image,
        type: 'multipart/form-data',
        name: image
    });

    const res = await api.post('/products/image', data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    });

    return res;
}