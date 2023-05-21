import { UserResponse } from "../features/auth/types";
import {
  LoginCredentialsDTO,
  loginWithEmailAndPassword,
} from "../features/auth/api/login";
import {
  RegisterCredentialsDTO,
  registerWithEmailAndPassword,
} from "../features/auth/api/register";
import storage from "../utils/storage";

const handleUserResponse = async (data: UserResponse) => {
  const { token, email } = data;

  storage.setToken(token);
  storage.setUser(email);
  return email;
};

export const loginFn = async (data: LoginCredentialsDTO) => {
  const res = await loginWithEmailAndPassword(data);
  const user = await handleUserResponse(res);
  return user;
};

export const registerFn = async (data: RegisterCredentialsDTO) => {
  const res = await registerWithEmailAndPassword(data);
  const user = await handleUserResponse(res);
  return user;
};

export const logoutFn = () => {
  storage.removeToken();
  storage.removeUser();
  window.location.assign(window.location.origin as unknown as string);
};
