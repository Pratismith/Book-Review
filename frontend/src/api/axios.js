// src/apis.js
import axios from 'axios';

const API_BASE = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL || '/api' // Netlify will proxy /api to your backend
  : 'http://localhost:3001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // include if backend uses cookies; safe to keep
});

// Attach token (if exists) to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
