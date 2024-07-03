export interface User {
  uuid: string;
  email: string;
  firstname: string;
  lastname: string;
  profilePictureUrl?: string;
  isBanned: boolean;
  verified?: boolean;
  role: "admin" | "user";
}
