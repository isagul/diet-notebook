import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.API_PREFIX || "https://diet-notebook-backend.fly.dev/",
});

export default axiosInstance;