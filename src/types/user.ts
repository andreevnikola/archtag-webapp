import { PublicUser } from "@/lib/public-user";

export interface User {
  uuid: string;
  email: string;
  firstname: string;
  lastname: string;
  profilePictureUrl?: string;
  profilePictureFileName?: string;
  isBanned: boolean;
  verified?: boolean;
  role: "admin" | "user";
  perPublicUser: PublicUser | null;
}
