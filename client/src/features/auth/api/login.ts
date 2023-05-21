import { axios } from "../../../lib/axios";

import { UserResponse } from "../types";
import { LoginCredentialsDTO } from "../types";

export const loginWithEmailAndPassword = (
  data: LoginCredentialsDTO
): Promise<UserResponse> => {
  return axios.post("/auth/login", data);
};
