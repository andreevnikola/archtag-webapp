export interface User {
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  isBanned: boolean;
  isEmailValidated?: boolean;
  role: "admin" | "user";
}
