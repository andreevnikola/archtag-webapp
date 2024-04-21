import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/_authenticate/signin")({
  component: SignInPage,
});

function SignInPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">
        Вписване
      </h1>
    </div>
  );
}
