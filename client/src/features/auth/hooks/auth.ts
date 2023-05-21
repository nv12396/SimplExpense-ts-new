import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { loginFn, registerFn } from "../../../lib/auth";

export const AUTH_KEYS = {
  fetchProfile: () => ["api", "auth", "profile", "fetch"],
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation(loginFn, {
    onSuccess: () => queryClient.invalidateQueries(AUTH_KEYS.fetchProfile()),
    onError: (error: AxiosResponse<{ message: string }>) => error,
  });
};
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation(registerFn, {
    onSuccess: () => queryClient.invalidateQueries(AUTH_KEYS.fetchProfile()),
  });
};
