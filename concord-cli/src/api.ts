import axios from "axios";
import "dotenv/config"

const apiClient = axios.create({
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    timeout: 10000
})

export default apiClient;