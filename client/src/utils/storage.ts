import { UserEmail } from "../features/auth/types";

const storage = {
  getToken: () => {
    return JSON.parse(window.localStorage.getItem("token") as string);
  },

  setToken: (token: string) => {
    return window.localStorage.setItem("token", JSON.stringify(token));
  },
  removeToken: () => {
    return window.localStorage.removeItem("token");
  },
  getUser: () => {
    return JSON.parse(window.localStorage.getItem("user") as string);
  },
  setUser: (user: UserEmail): void => {
    return window.localStorage.setItem("user", JSON.stringify(user));
  },
  removeUser: () => {
    return window.localStorage.removeItem("user");
  },
};

export default storage;
