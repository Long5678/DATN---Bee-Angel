import axios from "axios";
import { refreshAccessToken } from "./path-to-your-auth-context"; // import hàm refresh token

// Thêm interceptor cho axios
axios.interceptors.request.use(
    async (config) => {
        let token = localStorage.getItem("accessToken");

        // Nếu không có token hoặc token hết hạn, gọi hàm refresh
        if (!token) {
            token = await refreshAccessToken(); // Làm mới access token
        }

        // Thêm token vào headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);