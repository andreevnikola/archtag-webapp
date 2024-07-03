import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Request } from "@/lib/requestr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate, faWarning } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/hooks/useUser";
import { useAuthenticationStore } from "@/stores/AuthenticationStore";
import { revalidateToken, updateUserData } from "@/lib/authenticationUtils";

export const Route = createFileRoute("/auth/verify-email")({
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

const resendVerificationRequest = (token: string) =>
  Request.builder<{}, { success: boolean; message?: string }>()
    .useNotificatonErrorHandler()
    .method("GET")
    .url("/auth/resend-verification")
    .headers({
      Authorization: `Bearer ${token}`,
    })
    .build();

function VerifyEmailPage() {
  const { code } = Route.useSearch<{ code: string }>();
  const navigate = useNavigate();
  const [hasErrorOccured, setHasErrorOccured] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, verified } = useUser();
  const token = useAuthenticationStore((state) => state.token); // Retrieve the token from the store
  const [isResendingVerification, setIsResendingVerification] = useState(false);

  console.log(verified);

  useEffect(() => {
    updateUserData();
  }, []);

  useEffect(() => {
    if (verified) {
      navigate({
        to: "/",
      });
    }
  }, [verified]);

  useEffect(() => {
    const verifyEmailRequest = Request.builder<{}, VerifyEmailResponse>()
      .method("GET")
      .url(`/auth/verify-email/${code}`)
      .build();

    const verifyEmail = async () => {
      setIsLoading(true);
      const { res, error } = await verifyEmailRequest.send();

      if (!error) {
        setHasErrorOccured(false);
      } else {
        setHasErrorOccured(true);
      }
      setIsLoading(false);
    };

    verifyEmail();
  }, [code, navigate]);

  const handleResendVerification = async () => {
    setIsResendingVerification(true);
    await resendVerificationRequest(token).send();
    setIsResendingVerification(false);
  };

  const handleGoToAccount = async () => {
    await revalidateToken();

    navigate({
      to: "/account",
    });
  };

  return (
    <div className="flex w-full min-h-reasonably-tall items-center justify-center p-2">
      <div
        className={`flex flex-col gap-3 w-full max-w-3xl px-7 py-12 rounded-xl border border-primary-transparent-30 bg-gradient-to-tr ${hasErrorOccured ? "from-destructive-transparent-30" : "from-success-transparent-30"} via-transparent to-transparent`}
      >
        <div className="flex sm:hidden flex-col min-h-[100%] items-center justify-center">
          <FontAwesomeIcon
            icon={hasErrorOccured ? faWarning : faCertificate}
            size="9x"
          />
        </div>
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl text-center">
          {hasErrorOccured && "Не успяхме да активираме акаунта Ви"}
          {!hasErrorOccured && "Успешно активирахте акаунта си"}
        </h1>
        <div className="flex flex-row gap-7 p-4 w-full max-w-3xl">
          <div className="flex flex-col min-h-[100%] items-center justify-center max-sm:hidden">
            <FontAwesomeIcon
              icon={hasErrorOccured ? faWarning : faCertificate}
              size="6x"
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-6 w-full">
            <p className="text-justify">
              {hasErrorOccured &&
                "Използваният от Вас линк за верификация е невалиден. Единствено последния изпратен от нас верификационен линк, може да бъде използван за активиране на акаунта Ви. Можете да заявите нош имейл за верификация с бутона по-долу."}
              {!hasErrorOccured &&
                "Верификацията на електронната Ви поща беше усешна. Акаунта Ви е активиран и готов за използване."}
            </p>

            {isLoading && <p>Валидираме електронната ти поща...</p>}

            {!isLoading && (
              <div className="flex flex-row max-sm:flex-col w-full justify-between p-2 gap-2">
                {hasErrorOccured ? (
                  <>
                    <Button
                      onClick={() =>
                        navigate({
                          to: "/auth/signin",
                          search: {
                            from: window.location.pathname,
                          },
                        })
                      }
                      className="w-full"
                      variant={"outline"}
                    >
                      Вписване в друг акаунт
                    </Button>
                    {isAuthenticated && (
                      <Button
                        onClick={() => handleResendVerification()}
                        className="w-full"
                        variant={"default"}
                        disabled={isResendingVerification}
                      >
                        Препрати имейл за верификация
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    {!isAuthenticated && (
                      <Button
                        onClick={() =>
                          navigate({
                            to: "/auth/signin",
                          })
                        }
                        className="w-full"
                        variant={"outline"}
                      >
                        Впиши се
                      </Button>
                    )}
                    <Button
                      onClick={() => handleGoToAccount()}
                      className="w-full"
                      variant={"default"}
                    >
                      Настройки на профил
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
