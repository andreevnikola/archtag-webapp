import { Button } from "@/components/ui/button";
import {
  createFileRoute,
  Link,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";

export const Route = createFileRoute("/auth/_authenticate")({
  component: AuthenticateLayout,
});

function AuthenticateLayout() {
  const router = useRouterState();
  return (
    <div className="w-full min-h-reasonably-tall flex justify-center items-center gap-1 flex-col p-6 max-sm:p-3">
      <div className="p-2 gap-2 flex flex-row">
        <Link to="/auth/signin">
          <Button
            variant={
              router.location.pathname.endsWith("/signin") ? "outline" : "link"
            }
            className={`text-lg ${router.location.pathname.endsWith("/signin") ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground cursor-default" : ""}`}
          >
            Впиши се
          </Button>
        </Link>
        <p className="mt-1">/</p>
        <Link to="/auth/register">
          <Button
            variant={
              router.location.pathname.endsWith("/register")
                ? "outline"
                : "link"
            }
            className={`text-lg ${router.location.pathname.endsWith("/register") ? "bg-primary text-primary-foreground hover:text-primary-foreground hover:bg-primary cursor-default" : ""}`}
          >
            Регистрирай се
          </Button>
        </Link>
      </div>
      <div className="rounded-lg border border-border bg-primary-foreground p-10 px-6 w-full max-w-2xl flex flex-col gap-3 items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}
