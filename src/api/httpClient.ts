import { http } from "./axiosConfig";
import { handleRequestError } from "@/utils/errorHandler";

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Obtener el token del localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    handleRequestError(error);
    return Promise.reject(error);
  }
);

export default http;
