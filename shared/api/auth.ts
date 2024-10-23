import type { AxiosError, InternalAxiosRequestConfig, AxiosRequestConfig, AxiosResponse, AxiosInstance, Axios } from 'axios';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';


// Базовый URL для API запросов
const API_URL = 'https://testdesk.ru/api';


// Создание экземпляра axios с базовым URL и заголовками
export const axiosClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

// Функция для получения accessToken
export const getAccessToken = async () => {
    return await SecureStore.getItemAsync('accessToken');
  };


// Функция для получения refreshToken
export const getRefreshToken = async () => {
    return await SecureStore.getItemAsync('refreshToken');
  };

// Функция для сохранения accessToken 
export const saveAccessToken = async (token: string) => {
    await SecureStore.setItemAsync('accessToken', token);
  };

// Функция для сохранения refreshToken 
export const saveRefreshToken = async (token: string) => {
    await SecureStore.setItemAsync('refreshToken', token);
  };



// Функция для удаления токенов из безопасного хранилища
export const removeTokens = async () => {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');

  };




// Интерцептор для добавления токена к каждому запросу и обновление токена
const addTokenInterceptor = (axiosInstance: AxiosInstance) => {

    axiosInstance.interceptors.request.use(
        async (config: InternalAxiosRequestConfig) =>{
            const accessToken = await getAccessToken();
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        },
        (error: AxiosError) => {
            console.error('Request Error:', error.message);
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response: AxiosResponse) => {
            return response;
        },
        async (error: AxiosError) => {
            const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

            if (originalRequest && error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const refreshToken = await getRefreshToken();
                    if (!refreshToken) throw new Error('No refresh token found');

                    const refreshResponse = await axiosInstance.post('/refresh', {
                        refresh_token: refreshToken,
                    });

                    const { access_token } = refreshResponse.data;
                    console.log('Retrieved new access token:', access_token);
                    await saveAccessToken(access_token);

                    originalRequest.headers.Authorization = `Bearer ${access_token}`;

                    console.log('Retrying request with new token...');
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    console.error('Token refresh failed:', refreshError);
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(error);
        }
    );
};

addTokenInterceptor(axiosClient);


// Функция для логина
export const login = async (username: string, password: string) => {
    try{
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        const response = await axiosClient.post('/login', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const { access_token, refresh_token } = response.data;

        await saveAccessToken(access_token);
        await saveRefreshToken(refresh_token);
        

        console.log('Login successful:', response.data);
        return response.data;
    } catch (error: AxiosError | any) {
        console.error('Login failed:', error.response?.data || error.message);
        throw error;
    }
};

// Функция для выхода
export const logout = async () => {
    try {
        await removeTokens();
    } catch (error: AxiosError | any) {
        console.error('Logout failed:', error.response?.data || error.message);
        throw error;
    }
};
