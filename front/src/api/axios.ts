// front/src/api/axios.ts
import axios from "axios";

const VITE_PORT = import.meta.env.VITE_SERVER_PORT;
const VITE_HOST = import.meta.env.VITE_SERVER_HOST;
const VITE_URL = import.meta.env.VITE_SERVER_URL; // se você tiver uma URL completa

const baseURL =
  (VITE_URL as string) ||
  `http://${(VITE_HOST as string) || "localhost"}:${(VITE_PORT as string) || "3000"}`;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export default api;
