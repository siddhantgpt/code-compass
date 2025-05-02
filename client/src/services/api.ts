import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// Attach token to all requests
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("token");
    if (token && token !== "null" && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.warn("Token access error:", error);
  }
  return config;
});

// Auth
export const registerUser = (email: string, password: string) =>
  api.post("/auth/register", { email, password });

export const loginUser = (email: string, password: string) =>
  api.post("/auth/login", { email, password });

// Dashboard
export const getDashboardData = () => api.get("/dashboard/summary");

// Problems
export const getProblems = async () => {
  const response = await api.get("/problems");
  return response.data;
};

export const updateProgress = async (problemId: string) => {
  const response = await api.post("/progress", { problemId });
  return response.data;
};

export const getProgress = async () => {
  const response = await api.get("/progress");
  return response.data;
};

export const getProfile = () => api.get("/user/me");

export const updateProfile = (data: {
  fullName: string;
  email: string;
  dob: string;
}) => api.put("/user/update", data);

export const updatePassword = (data: {
  currentPassword: string;
  newPassword: string;
}) => api.put("/auth/change-password", data);

export default api;
