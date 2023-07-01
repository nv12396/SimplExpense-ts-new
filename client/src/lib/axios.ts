import Axios from "axios";
import { toast } from "react-toastify";

import storage from "../utils/storage";
// import { API_URL } from "../config";

export const axios = Axios.create({
  baseURL: "https://simplexpense-ts-new-production.up.railway.app/api/",
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
