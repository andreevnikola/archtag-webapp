import { User } from "@/types/user";
import { create } from "zustand";

export interface UserStore extends User {
  setUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  isBanned: false,
  firstName: "",
  lastName: "",
  email: "",
  uuid: "",
  role: "user",
  isEmailValidated: false,
  setUser: (user: User) => set(user),
}));
