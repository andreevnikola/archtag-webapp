import { useUserStore } from "@/stores/UserStore";

export function useUser() {
  const user = useUserStore();
  return { ...user, isAuthenticaed: user.uuid !== "" && !user.isBanned };
}
