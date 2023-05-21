import { create } from "zustand";

import storage from "../utils/storage";

type AuthStore = {
  useAuth: () => string | null;
};

export const useAuthStore = create<AuthStore>(() => ({
  useAuth: () => storage.getToken(),
}));
