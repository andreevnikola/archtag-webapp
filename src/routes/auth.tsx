import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  component: () => <AuthenticationLayoutComponent />,
});

function AuthenticationLayoutComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
