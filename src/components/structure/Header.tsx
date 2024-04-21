import { useRouterState } from "@tanstack/react-router";
import { AuthenticatedHeader } from "./AuthenticatedHeader";
import { UnauthenticatedHeader } from "./UnauthenticatedHeader";

export function Header() {
  const router = useRouterState();

  if (router.location.pathname.startsWith("/auth"))
    return <UnauthenticatedHeader />;

  return <AuthenticatedHeader />;
}
