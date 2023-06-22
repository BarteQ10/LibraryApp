import axios, { AxiosError } from "axios";
import EventEmitter from 'events';

export const tokenRefreshEventEmitter = new EventEmitter();
const apiUrl = process.env.REACT_APP_API_URL;

// create a custom axios instance
const instance = axios.create({
  baseURL: apiUrl
});

// Create a Set to store retried requests
const retriedRequests = new Set();

// add the request interceptor
instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

// add the response interceptor
instance.interceptors.response.use(
  response => response,
  (error: AxiosError) => errorHandler(error)
);

export default instance;

async function errorHandler(error: AxiosError) {
  const originalRequest = error.config;
  console.log("Error status:", error.response?.status);
  if (originalRequest) {
    console.log("Original request is defined");
    console.log("Already retried?", retriedRequests.has(originalRequest.url));
    if (error.response && error.response.status === 401 && !retriedRequests.has(originalRequest.url)) {
      retriedRequests.add(originalRequest.url);
      const refreshToken = localStorage.getItem("refreshToken");
      const userId = localStorage.getItem("userId");
      console.log("Refresh token:", refreshToken);
      console.log("User ID:", userId);
      console.log("Refreshing token...");
      if (refreshToken && userId) {
        try {
          const response = await refresh(+userId, refreshToken);
          localStorage.setItem("token", response.data.jwtToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          originalRequest.headers.Authorization = `Bearer ${response.data.jwtToken}`;
          tokenRefreshEventEmitter.emit('tokenRefreshed');
          return instance(originalRequest); // Return the updated request with the new token
        } catch (refreshError) {
          console.log("Error refreshing token:", refreshError);
          return Promise.reject(refreshError);
        }
      }
    }
  }
  return Promise.reject(error);
}

async function refresh(userId: number, refreshToken: string) {
  try {
    const response = await axios.post(
      `${apiUrl}/Account/refresh`,
      {
        userId: userId,
        refreshToken: refreshToken
      }
    );
    return response;
  } catch (error) {
    console.log("Error refreshing token:", error);
    throw error;
  }
}
