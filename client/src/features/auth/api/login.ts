import { axios } from "../../../lib/axios";

import { LoginCredentialsDTO, UserResponse } from "../types";

export const loginWithEmailAndPassword = (
  data: LoginCredentialsDTO
): Promise<UserResponse> => {
  return axios.post("/auth/login", data);
};
