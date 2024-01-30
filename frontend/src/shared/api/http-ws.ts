import axios from 'axios'
export const http_ws = axios.create({
    baseURL: import.meta.env.VITE_HTTP_WS_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})
