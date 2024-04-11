import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authentication/signin")({
  component: () => <div>Hello /(authentication)/signin!</div>,
});
