import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Request } from "@/lib/requestr";

export const Route = createFileRoute("/auth/_authenticate/verify-email")({
  component: VerifyEmailPage,
  validateSearch: (search: any) => {
    return {
      code: search.code,
    };
  },
});

interface VerifyEmailResponse {
  success: boolean;
  message?: string;
}

function VerifyEmailPage() {
  const { code } = Route.useSearch<{ code: string }>();
  const navigate = useNavigate();
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyEmailRequest = Request.builder<{}, VerifyEmailResponse>()
      .useNotificatonErrorHandler()
      .method("GET")
      .url(`/auth/verify-email/${code}`)
      .build();

    const verifyEmail = async () => {
      setIsLoading(true);
      const { res, error } = await verifyEmailRequest.send();
      setIsLoading(false);

      if (!error) {
        setResponseMessage("Email verified successfully. Redirecting...");
        navigate({ to: "/" });
      } else {
        setResponseMessage(res?.message || "An error occurred, please try again.");
      }
    };

    verifyEmail();
  }, [code, navigate]);

  return (
    <div className="flex flex-col justify-center items-center gap-6 w-full">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">
        Email Verification
      </h1>

      {responseMessage && (
        <div className="alert">
          {responseMessage}
        </div>
      )}

      {isLoading && <p>Verifying email...</p>}
    </div>
  );
}