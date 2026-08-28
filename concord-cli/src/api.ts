import axios from "axios";
import "dotenv/config"

const apiClient = axios.create({
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    timeout: 10000,
    headers:{
        'user-key': process.env.CONCORD_API_KEY
    }
})

export default apiClient;