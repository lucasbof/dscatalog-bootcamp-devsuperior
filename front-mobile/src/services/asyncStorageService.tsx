import AsyncStorage from '@react-native-async-storage/async-storage';

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

export const getToken = async () => {
    try {
        
        const token = await AsyncStorage.getItem('@token');

        return token;
    }
    catch(e) {
        console.warn(e);
    }
}

export const setToken = async (token: string) => {
    try {
        
        setAsyncKeys('@token', token);
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