import { useRouter } from "@tanstack/react-router";
import { Button } from "../ui/button";

export default function NotFound() {
  const router = useRouter();
  const goBack = () => router.history.back();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg">Страницата не беше намерена!</p>
      <Button
        onClick={() => goBack()}
        variant={"link"}
        className="text-primary underline mt-2"
      >
        Върни се обратно
      </Button>
    </div>
  );
}
