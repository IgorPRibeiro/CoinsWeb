import axios from "axios";

export const BASE_URL = "http://localhost:3001/";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Adicione o token ao cabeçalho
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // TODO: REDIRECIONAR PARA TELA DE LOGIN
    }
    return Promise.reject(error);
  }
);

export default api;
