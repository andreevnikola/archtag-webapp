import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authentication")({
  component: () => <AuthenticationLayoutComponent />,
});

function AuthenticationLayoutComponent() {
  return (
    <>
      <p>gay</p>
      <Outlet />
    </>
  );
}
