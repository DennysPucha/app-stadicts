import AsyncStorage from '@react-native-async-storage/async-storage';
import { verify_jwt } from './methods';

export const storeSession = async (token) => {
    try {
        if (!token) {
            throw new Error('El token no puede estar vacío');
        }
        
        const payload = await verify_jwt(token);

        if (payload.code !== 200) {
            throw new Error('El token no es válido');
        }

        await AsyncStorage.setItem('access_token', token);
        await AsyncStorage.setItem('user_data', JSON.stringify(payload.data));

    } catch (error) {
        console.error('Error al guardar sesión:', error);
    }
};

export const getToken = async () => {
    const credentials = await AsyncStorage.getItem('access_token');
    return credentials;
};


export const getUserData = async () => {
    const data = await AsyncStorage.getItem('user_data');
    return data ? JSON.parse(data) : null;
};