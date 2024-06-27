export interface User {
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  isBanned: boolean;
  verified?: boolean;
  role: "admin" | "user";
}
