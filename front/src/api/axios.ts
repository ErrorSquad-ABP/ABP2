// front/src/api/axios.ts
import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_SERVER_URL ||
  `http://localhost:${import.meta.env.VITE_SERVER_PORT || 3000}`;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export default api;
