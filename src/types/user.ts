export interface User {
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  isBanned: boolean;
  role: "admin" | "user";
}
