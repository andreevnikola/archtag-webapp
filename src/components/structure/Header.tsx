import { useRouterState } from "@tanstack/react-router";
import { AuthenticatedHeader } from "./AuthenticatedHeader";
import { UnauthenticatedHeader } from "./UnauthenticatedHeader";
import { isAuthenticated } from "@/lib/utils/authenticationUtils";
import { useUser } from "@/lib/hooks/useUser";

export function Header() {
  const router = useRouterState();

  return (
    <div style={{position: 'fixed', zIndex: 100}}>
      {isAuthenticated() ? <AuthenticatedHeader /> : <UnauthenticatedHeader />}
    </div>
  );
}
