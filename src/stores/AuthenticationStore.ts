import { create } from "zustand";

export interface AuthenticationStore {
  token: string;
  refreshToken: string;
  setToken: (token: string) => void;
  setRefreshToken: (refreshToken: string) => void;
}

export const useAuthenticationStore = create<AuthenticationStore>((set) => ({
  token: localStorage.getItem("token") || "",
  refreshToken: localStorage.getItem("refreshToken") || "",
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },
  setRefreshToken: (refreshToken) => {
    localStorage.setItem("refreshToken", refreshToken);
    set({ refreshToken });
  },
}));
