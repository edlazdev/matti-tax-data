import axios from "axios";

const http = axios.create();

// Interceptor para manejar errores
http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error en la API:", error);
    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  }
);

export default http;
