export type ButtonTypes =
  | "default"
  | "secondary"
  | "outline"
  | "link"
  | "destructive";

export const apiUrl = import.meta.env.VITE_API_URL || "unknown api url";
