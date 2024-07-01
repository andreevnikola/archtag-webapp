import { User } from "@/types/user";
import { create } from "zustand";

export interface UserStore extends User {
  setUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  isBanned: false,
  firstname: "",
  lastname: "",
  email: "",
  uuid: "",
  role: "user",
  verified: false,
  setUser: (user: User) => set(user),
}));
