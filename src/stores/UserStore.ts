import { PublicUser } from "@/lib/public-user";
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
  profilePictureUrl: "", // Add this line
  verified: false,
  perPublicUser: null,
  setUser: (user: User) => set(user),
}));
