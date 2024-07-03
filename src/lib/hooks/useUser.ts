import { useUserStore } from "@/stores/UserStore";

export function useUser() {
  const user = useUserStore();
  return { ...user, isAuthenticated: user.uuid !== "" && !user.isBanned };
}
