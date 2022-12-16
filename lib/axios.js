import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: 'https://diet-notebook.fly.dev',
    baseURL: 'http://localhost:8080',
});

export default axiosInstance;