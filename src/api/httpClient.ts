import { http } from "./axiosConfig";
import { handleRequestError } from "@/utils/errorHandler";
import { useUtilStore } from "@/store";

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Obtener el token del localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    useUtilStore.getState().setLoading(true);
    return config;
  },
  (error) => {
    useUtilStore.getState().setLoading(false);
    Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    useUtilStore.getState().setLoading(false);
    return response;
  },
  (error) => {
    useUtilStore.getState().setLoading(false);
    handleRequestError(error);
    return Promise.reject(error);
  }
);

export default http;
