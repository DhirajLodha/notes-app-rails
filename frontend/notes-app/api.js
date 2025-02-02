import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/v1", // Your Rails API endpoint
  headers: {"Content-type" : "application/json"}
});

// Optional: Intercept request to add authorization token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
