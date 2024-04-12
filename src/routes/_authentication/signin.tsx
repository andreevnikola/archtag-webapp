import { createFileRoute, useLoaderData } from "@tanstack/react-router";

const test = async () =>
  new Promise<{ msg: string }>((resolve) =>
    setTimeout(() => resolve({ msg: "idk" }), 1000)
  );

export const Route = createFileRoute("/_authentication/signin")({
  loader: async () => await test(),
  component: SignInPage,
});

function SignInPage() {
  const msg = Route.useLoaderData<{ msg: string }>();

  return <div>Hello /(authentication)/signina! {msg.msg}</div>;
}
