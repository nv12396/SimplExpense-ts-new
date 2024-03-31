import Axios from "axios";
import { toast } from "react-toastify";

import { API_URL } from "../config";
import storage from "../utils/storage";

export const axios = Axios.create({
  // baseURL: "https://simplexpense-ts-new-production.up.railway.app/api",
  // baseURL: "http://localhost:3000/api",
  baseURL: API_URL,
});

axios.interceptors.request.use(
  (config) => {
    const token = storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.Accept = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    toast.error(message, { position: toast.POSITION.BOTTOM_CENTER });

    return Promise.reject(error);
  }
);
