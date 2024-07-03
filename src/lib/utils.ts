import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPromotionalWebsiteUrl(route: string) {
  return import.meta.env.VITE_PROMOTIONAL_WEBSITE_URL + route;
}

export function getSignInPathWithRedirect() {
  return {
    to: "/auth/signin",
    search: {
      from: window.location.pathname,
    },
  };
}
