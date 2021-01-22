import { UserInfo } from '../types';
import { api } from './index';
import queryString from 'query-string';
import { Base64 } from 'js-base64';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (userInfo: UserInfo) => {
    const CLIENT_ID = 'dscatalog';
    const CLIENT_SECRET = 'dscatalog123';
    const data = queryString.stringify({ ...userInfo, grant_type: 'password' });

    const token = `${CLIENT_ID}:${CLIENT_SECRET}`;

    const result = await api.post('oauth/token', data, {
        headers: {
            Authorization: `Basic ${Base64.encode(token)}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });

    const { access_token } = result.data;

    setAsyncKeys('@token', access_token);

    return result;
}

const setAsyncKeys = async (key: string, value: string) => {
    try {
        AsyncStorage.setItem(key, value);
    }
    catch(e) {
        console.warn(e);
    }
}

export const isAuthenticated = async () => {
    try {
    
        const token = await AsyncStorage.getItem('@token');

        return !!token;
    }
    catch(e) {
        console.warn(e);
    }
}

export const doLogout =  async () => {
    try {
        AsyncStorage.removeItem('@token');
    }
    catch(e) {
        console.warn(e);
    }
}