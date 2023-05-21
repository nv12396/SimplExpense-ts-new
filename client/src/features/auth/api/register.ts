import { axios } from "../../../lib/axios";
import { UserResponse } from "../types";

export type RegisterCredentialsDTO = {
  name: string;
  email: string;
  password: string;
};

export const registerWithEmailAndPassword = async (
  data: RegisterCredentialsDTO
): Promise<UserResponse> => {
  return axios.post("/auth/register", data);
};
