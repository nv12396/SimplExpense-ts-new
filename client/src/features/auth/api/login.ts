import { axios } from "../../../lib/axios";

import { LoginCredentialsDTO, UserResponse } from "../types";

export const loginWithEmailAndPassword = (
  data: LoginCredentialsDTO
): Promise<UserResponse> => {
  console.log(import.meta.env.VITE_API_URL);
  return axios.post("/auth/login", data);
};
