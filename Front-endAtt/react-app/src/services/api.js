import axios from "axios";
import { getAccessToken, getRefreshToken, clearTokens } from "../services/auth.js"; 

const API = axios.create({
  baseURL: "http://127.0.0.1:8000", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Check if token is expired
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    return now >= payload.exp;
  } catch (e) {
    return true;
  }
};

// Request interceptor: attach token if valid
API.interceptors.request.use((config) => {
  // Don't attach token for signup/login endpoints
  if (config.url.includes("/register/") || config.url.includes("/login/")) {
    return config;
  }

  const token = getAccessToken();
  if (token && !isTokenExpired(token)) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    clearTokens(); 
  }

  return config;
}, (error) => Promise.reject(error));

// Response interceptor: handle token errors
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.data?.code === "token_not_valid") {
      clearTokens();
    }
    return Promise.reject(err);
  }
);

export default API;
