import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.API_PREFIX || 'https://todo-app-backend.fly.dev',
});

export default axiosInstance;