export type ButtonTypes =
  | "default"
  | "secondary"
  | "outline"
  | "link"
  | "destructive";

export const apiUrl = import.meta.env.VITE_API_URL || "unknown api url";

export const staticUrl =
  import.meta.env.VITE_STATIC_URL || "unknown static url";

export const supportPhoneNumber = "032 540 135";
export const supportEmail = "problems@archtag.org";
