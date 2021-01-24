import { UserInfo } from '../types';
import { api } from './index';
import queryString from 'query-string';
import { Base64 } from 'js-base64';
import { setToken } from './asyncStorageService';


const CLIENT_ID = 'dscatalog';
const CLIENT_SECRET = 'dscatalog123';

export const login = async (userInfo: UserInfo) => {
    const data = queryString.stringify({ ...userInfo, grant_type: 'password' });

    const token = `${CLIENT_ID}:${CLIENT_SECRET}`;

    const result = await api.post('oauth/token', data, {
        headers: {
            Authorization: `Basic ${Base64.encode(token)}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });

    const { access_token } = result.data;

    setToken(access_token);

    return result;
}

