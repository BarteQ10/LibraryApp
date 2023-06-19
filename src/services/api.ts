import axios from "axios";
import jwt_decode from "jwt-decode";

const apiUrl = process.env.REACT_APP_API_URL;
let token = localStorage.getItem("token");

const instance = axios.create({
  baseURL: apiUrl
});

// Interceptor odpowiedzi
instance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401) {
      const response = await refresh();
      if (response) {
        token = localStorage.getItem("token");
        error.config.headers.Authorization = `Bearer ${token}`;
        return instance.request(error.config);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;

async function refresh() {
  try {
    const response = await axios.post(
      `${apiUrl}/Account/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Token został odświeżony" + response.data);
    localStorage.setItem("token", response.data);
    return response.data;
  } catch (error) {
    console.log("Błąd odświeżenia tokenu", error);
    throw error; 
  }
}