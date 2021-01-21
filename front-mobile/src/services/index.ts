import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://lucas-dscatalog.herokuapp.com'
});