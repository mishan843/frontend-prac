import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';

// const API_URL = import.meta.env.VITE_APP_API_LOCAL_URL;
const API_URL = "http://localhost:5000/api";

const api: AxiosInstance = axios.create({
    baseURL: API_URL,
    maxContentLength: Infinity,
});

// Add a request interceptor
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => {
        // Handle successful responses
        return response;
    },
    (error: AxiosError) => {
        // Handle errors
        if (error.response?.status === 401) {
            // Handle unauthorized error
            console.log('Unauthorized');
        }
        return Promise.reject(error);
    }
);

export default api;