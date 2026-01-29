// src/api/axiosInstance.ts
import { getAccessToken } from "@/storage/token.storage";
import axios from "axios";
import Constants from "expo-constants";

const apiUrl = Constants.expoConfig?.extra?.apiUrl;


const axiosInstance = axios.create({
    baseURL: `${apiUrl}/api`,
    timeout: 10000, // 10 seconds timeout
});

// Request interceptor (optional, e.g., add auth token)
axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await getAccessToken();
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor (optional, for global error handling)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // You can do centralized error logging or transformations here
        return Promise.reject(error);
    }
);

export default axiosInstance;
