import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayoutComponent,
});

function AuthenticatedLayoutComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
